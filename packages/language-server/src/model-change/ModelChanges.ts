import { invariant, nonexhaustive } from '@likec4/core'
import { Location, Range, TextDocumentEdit, TextEdit } from 'vscode-languageserver-protocol'
import { type ParsedLikeC4LangiumDocument } from '../ast'
import type { LikeC4ModelLocator } from '../model'
import type { LikeC4Services } from '../module'
import type { ChangeViewRequestParams } from '../protocol'
import { changeViewLayout } from './changeViewLayout'
import { changeViewStyle } from './changeViewStyle'

function unionRangeOfAllEdits(edits: TextEdit[]): Range {
  let start = Number.MAX_SAFE_INTEGER
  let end = Number.MIN_SAFE_INTEGER
  for (const edit of edits) {
    start = Math.min(start, edit.range.start.line)
    end = Math.max(end, edit.range.end.line)
  }
  return Range.create(start, 0, end, 0)
}

export class LikeC4ModelChanges {
  private locator: LikeC4ModelLocator

  constructor(private services: LikeC4Services) {
    this.locator = services.likec4.ModelLocator
  }

  public async applyChange(changeView: ChangeViewRequestParams): Promise<Location | null> {
    const lspConnection = this.services.shared.lsp.Connection
    invariant(lspConnection, 'LSP Connection not available')
    let result: Location | null = null
    await this.services.shared.workspace.WorkspaceLock.write(async () => {
      const { doc, edits } = this.convertToTextEdit(changeView)
      const textDocument = {
        uri: doc.textDocument.uri,
        version: doc.textDocument.version
      }
      if (!edits.length) {
        return
      }
      const applyResult = await lspConnection.workspace.applyEdit({
        label: `LikeC4 - change view ${changeView.viewId}`,
        edit: {
          documentChanges: [
            TextDocumentEdit.create(textDocument, edits)
          ]
        }
      })
      if (!applyResult.applied) {
        lspConnection.window.showErrorMessage(`Failed to apply changes${applyResult.failureReason}`)
        return
      }
      result = {
        uri: textDocument.uri,
        range: unionRangeOfAllEdits(edits)
      }
    })
    return result
  }

  protected convertToTextEdit({ viewId, changes }: ChangeViewRequestParams): {
    doc: ParsedLikeC4LangiumDocument
    edits: TextEdit[]
  } {
    const lookup = this.locator.locateViewAst(viewId)
    if (!lookup) {
      throw new Error(`View not found: ${viewId}`)
    }
    const edits = [] as TextEdit[]
    for (const change of changes) {
      switch (change.op) {
        case 'change-color': {
          edits.push(...changeViewStyle(this.services, {
            ...lookup,
            targets: change.targets,
            key: 'color',
            value: change.color
          }))
          break
        }
        case 'change-shape': {
          edits.push(...changeViewStyle(this.services, {
            ...lookup,
            targets: change.targets,
            key: 'shape',
            value: change.shape
          }))
          break
        }
        case 'change-autolayout': {
          edits.push(...changeViewLayout(this.services, {
            ...lookup,
            layout: change.layout
          }))
          break
        }
        default:
          nonexhaustive(change)
      }
    }
    return {
      doc: lookup.doc,
      edits
    }
  }
}