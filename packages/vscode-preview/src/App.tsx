import { type DiagramNode, type DiagramView, hasAtLeast } from '@likec4/core'
import { LikeC4Diagram } from '@likec4/diagram'
import { ActionIcon } from '@mantine/core'
import { VSCodeButton, VSCodeProgressRing } from '@vscode/webview-ui-toolkit/react'
import { ArrowLeftIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  likec4Container,
  likec4DiagramLoading,
  likec4DiagramLoadingOverlay,
  likec4error,
  likec4ParsingScreen
} from './App.css'
import { Toolbar } from './Toolbar'
import { cssToolbarLeft } from './Toolbar.css'
import { useViewHistory } from './useViewHistory'
import { extensionApi, getPreviewWindowState, savePreviewWindowState, useMessenger } from './vscode'

const ErrorMessage = ({ error }: { error: string | null }) => (
  <div className={likec4error}>
    <p>
      Oops, something went wrong
      {error && (
        <>
          <br />
          {error}
        </>
      )}
    </p>
  </div>
)

const App = () => {
  const lastNodeContextMenuRef = useRef<DiagramNode | null>(null)

  function resetLastClickedNd() {
    lastNodeContextMenuRef.current = null
  }

  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [view, setView] = useState(getPreviewWindowState)
  const [error, setError] = useState<string | null>(null)

  const updateView = useCallback((view: DiagramView | null) => {
    resetLastClickedNd()
    if (view) {
      savePreviewWindowState(view)
      setState('ready')
      setView(view)
      setError(null)
    } else {
      setState('error')
      setError('View not found')
    }
  }, [])

  useMessenger({
    onDiagramUpdate: updateView,
    onError: error => {
      setState('error')
      setError(error)
    },
    onGetHoveredElement: () => {
      return lastNodeContextMenuRef.current?.id ?? null
    }
  })

  useEffect(() => {
    extensionApi.imReady()
  }, [])

  const prevView = useViewHistory(view)

  if (!view) {
    return (
      <div className={likec4ParsingScreen}>
        {state === 'error' && (
          <section>
            <h3>Oops, invalid view</h3>
            <p>
              Failed to parse your model:
              {error && (
                <>
                  <br />
                  {error}
                </>
              )}
            </p>
          </section>
        )}
        {state !== 'error' && (
          <section>
            <p>Parsing your model...</p>
            <VSCodeProgressRing />
          </section>
        )}
        <section>
          <p>
            <VSCodeButton appearance="secondary" onClick={extensionApi.closeMe}>
              Close
            </VSCodeButton>
          </p>
        </section>
      </div>
    )
  }
  return (
    <>
      <div className={likec4Container} data-vscode-context='{"preventDefaultContextMenuItems": true}'>
        <LikeC4Diagram
          view={view}
          fitViewPadding={0.08}
          readonly={false}
          controls={false}
          nodesDraggable
          experimentalEdgeEditing
          onNavigateTo={(to) => {
            resetLastClickedNd()
            extensionApi.goToViewSource(to)
            extensionApi.openView(to)
          }}
          onNodeClick={({ element, xynode, event }) => {
            extensionApi.goToElement(element.id)
            event.stopPropagation()
          }}
          onNodeContextMenu={({ element, xynode, event }) => {
            lastNodeContextMenuRef.current = element
          }}
          onCanvasContextMenu={event => {
            resetLastClickedNd()
            event.stopPropagation()
            event.preventDefault()
          }}
          onEdgeContextMenu={({ event }) => {
            resetLastClickedNd()
            event.stopPropagation()
            event.preventDefault()
          }}
          onEdgeClick={({ relation, event }) => {
            resetLastClickedNd()
            if (hasAtLeast(relation.relations, 1)) {
              extensionApi.goToRelation(relation.relations[0])
              event.stopPropagation()
            }
          }}
          onChange={({ change }) => {
            extensionApi.change(view.id, change)
          }}
          onCanvasClick={() => {
            resetLastClickedNd()
          }}
          onCanvasDblClick={() => {
            resetLastClickedNd()
            extensionApi.goToViewSource(view.id)
          }}
        />
      </div>
      {state === 'error' && <ErrorMessage error={error} />},
      {state === 'loading' && (
        <>
          <div className={likec4DiagramLoadingOverlay}></div>
          <div className={likec4DiagramLoading}>
            <p>Updating...</p>
            <VSCodeProgressRing />
          </div>
        </>
      )}
      {prevView && (
        <div className={cssToolbarLeft}>
          <ActionIcon
            color="gray"
            variant="light"
            onClick={e => {
              e.stopPropagation()
              extensionApi.goToViewSource(prevView.id)
              extensionApi.openView(prevView.id)
              // optimistic update
              updateView(prevView)
            }}>
            <ArrowLeftIcon style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </div>
      )}
      <Toolbar view={view} />
    </>
  )
}

export default App
