import { di, type LanguageClient } from '$/di'
import { mapParallelAsyncWithLimit, delay } from 'rambdax'
import { buildDocuments } from '@likec4/language-server/protocol'
import * as vscode from 'vscode'
import { Utils } from 'vscode-uri'

const extensions = ['.likec4', '.like-c4', '.c4']

const traversePath = async (folderPath: vscode.Uri): Promise<vscode.Uri[]> => {
  const files = await vscode.workspace.fs.readDirectory(folderPath)
  const docs = [] as vscode.Uri[]
  const folders = [] as vscode.Uri[]
  for (const [name, type] of files) {
    const uri = Utils.joinPath(folderPath, name)
    if (type === vscode.FileType.File && extensions.some(ext => name.endsWith(ext))) {
      docs.push(uri)
    }
    // TODO: add ignore patterns
    if (type === vscode.FileType.Directory) {
      folders.push(uri)
    }
  }
  const fromsubfolder = await mapParallelAsyncWithLimit(traversePath, 2, folders)
  return [
    ...docs,
    ...fromsubfolder.flat()
  ]
}


const collectDocsInWorkspaceVFs = async () => {
  const folders = (vscode.workspace.workspaceFolders ?? []).map(f => f.uri)
  const docs = await mapParallelAsyncWithLimit(traversePath, 2, folders)
  return docs.flat()
}


export async function initWorkspace(client: LanguageClient) {
  const docs = await collectDocsInWorkspaceVFs()
  for (const uri of docs) {
    try {
      await vscode.workspace.openTextDocument(uri)
    } catch (e) {
      console.error(e)
    }
  }
  await delay(500)
  const uris = docs.map(d => d.toString())
  await client.sendRequest(buildDocuments, uris)
  return uris
}
initWorkspace.inject = [di.client] as const
