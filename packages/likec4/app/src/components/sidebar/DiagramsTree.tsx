import { invariant } from '@likec4/core'
import { Box, Flex, Text } from '@mantine/core'
import { DashboardIcon, TriangleRightIcon } from '@radix-ui/react-icons'
import { useParams, useRouter, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import TreeView, { type INode } from 'react-accessible-treeview'
import { last } from 'remeda'
import { useDiagramsTree } from '../../data'
import './diagram-tree-styles.css'

function inTree(id: string, data: INode[]): boolean {
  return data.some(d => d.id === id)
}

export function DiagramsTree() {
  const data = useDiagramsTree()
  const { viewId } = useParams({
    select: (params) => 'viewId' in params ? { viewId: params.viewId } : { viewId: null },
    strict: false
  })
  const router = useRouter()
  const routerState = useRouterState()
  const selectedId = viewId && inTree(viewId, data) ? [viewId] : []

  return (
    <Box className={clsx('diagrams-treeview ')}>
      <TreeView
        data={data}
        propagateSelect
        propagateSelectUpwards
        selectedIds={selectedId}
        onNodeSelect={({ element, isBranch }) => {
          if (isBranch) {
            return
          }
          const m = last(routerState.matches)
          invariant(m, 'routerState.matches is empty')
          console.log({ m, element })
          router.navigate({
            to: m.routeId as string,
            params: { viewId: element.id },
            search: m.search,
            startTransition: true
          })
        }}
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          getNodeProps,
          handleExpand,
          handleSelect
        }) => {
          return (
            <Flex
              {...getNodeProps({ onClick: isBranch ? handleExpand : handleSelect })}
              align={'center'}
              gap={isBranch ? 2 : 4}
            >
              {isBranch && (
                <Box style={{ lineHeight: '15px' }}>
                  <TriangleRightIcon
                    width={15}
                    height={15}
                    className={clsx('transition duration-200 ease-out', isExpanded && 'rotate-90')}
                  />
                </Box>
              )}
              {!isBranch && (
                <Box style={{ lineHeight: '14px' }} w={'min-content'} mr={'4'} flex={'0'}>
                  <DashboardIcon width={14} height={14} />
                </Box>
              )}
              <Box flex={'1'}>
                <Text
                  truncate
                  size="sm"
                  fw={isBranch ? '600' : '500'}
                >
                  {(isBranch ? '🗂️ ' : '') + element.name}
                </Text>
              </Box>
            </Flex>
          )
        }}
      />
    </Box>
  )
}
