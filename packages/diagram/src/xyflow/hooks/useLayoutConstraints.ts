import { invariant, isAncestor, nonNullable } from '@likec4/core'
import { Expression, Expression as Expr, Operator, Solver, Strength, Variable } from '@lume/kiwi'
import type { InternalNode, ReactFlowProps, XYPosition } from '@xyflow/react'
import { getNodeDimensions, isInternalNodeBase } from '@xyflow/system'
import { useMemo, useRef } from 'react'
import { isNullish } from 'remeda'
import { useDiagramStoreApi } from '../../state'
import { type XYFlowInstance, XYFlowNode } from '../types'
import { useXYStoreApi, type XYStoreApi } from './useXYFlow'

abstract class Rect {
  id!: string
  minX = new Variable()
  minY = new Variable()
  maxX: Expression | Variable = new Variable()
  maxY: Expression | Variable = new Variable()

  get x() {
    return this.minX
  }

  get y() {
    return this.minY
  }

  get positionAbsolute(): XYPosition {
    return {
      x: this.x.value(),
      y: this.y.value()
    }
  }

  get dimensions() {
    return {
      width: this.maxX.value() - this.minX.value(),
      height: this.maxY.value() - this.minY.value()
    }
  }

  // Position relative to parent
  get position(): XYPosition {
    const positionAbsolute = this.positionAbsolute
    if (!this.parent) {
      return positionAbsolute
    }
    const parentPosition = this.parent.positionAbsolute
    return {
      x: positionAbsolute.x - parentPosition.x,
      y: positionAbsolute.y - parentPosition.y
    }
  }
  protected abstract parent: Compound | null
}

class Compound extends Rect {
  protected readonly children = [] as Rect[]

  constructor(
    protected solver: Solver,
    xynode: InternalNode<XYFlowNode>,
    protected readonly parent: Compound | null = null
  ) {
    super()
    this.id = xynode.id

    solver.createConstraint(this.maxX, Operator.Ge, this.minX)
    solver.createConstraint(this.maxY, Operator.Ge, this.minY)

    if (parent) {
      parent.addChild(this)
    }
  }

  addChild<R extends Rect>(rect: R) {
    this.children.push(rect)

    const leftPadding = new Expr(
      rect.minX,
      [-1, this.minX]
    )
    const { weak } = Strength
    this.solver.createConstraint(leftPadding, Operator.Ge, 40)
    this.solver.createConstraint(leftPadding, Operator.Eq, 40, weak)

    const topPadding = new Expr(
      rect.minY,
      [-1, this.minY]
    )
    this.solver.createConstraint(topPadding, Operator.Ge, 60)
    this.solver.createConstraint(topPadding, Operator.Eq, 60, weak)

    const rightPadding = new Expr(
      this.maxX,
      [-1, rect.maxX]
    )
    this.solver.createConstraint(rightPadding, Operator.Ge, 40)
    this.solver.createConstraint(rightPadding, Operator.Eq, 40, weak)

    const bottomPadding = new Expr(
      this.maxY,
      [-1, rect.maxY]
    )
    this.solver.createConstraint(bottomPadding, Operator.Ge, 40)
    this.solver.createConstraint(bottomPadding, Operator.Eq, 40, weak)
  }
}

class Leaf extends Rect {
  constructor(
    solver: Solver,
    xynode: InternalNode<XYFlowNode>,
    public readonly parent: Compound | null = null,
    public readonly isEditing: boolean = false
  ) {
    super()
    this.id = xynode.id

    // const isEditing: boolean = xynode.dragging ?? false
    const pos = xynode.internals.positionAbsolute

    const { width, height } = getNodeDimensions(xynode)

    this.maxX = new Expression(this.minX, width)
    this.maxY = new Expression(this.minY, height)

    // solver.createConstraint(this.width, Operator.Eq, width, Strength.required)
    // solver.createConstraint(this.height, Operator.Eq, height, Strength.required)

    if (isEditing) {
      const superStrong = Strength.create(100, 0, 0)
      solver.addEditVariable(this.minX, superStrong)
      solver.addEditVariable(this.minY, superStrong)
      solver.suggestValue(this.minX, pos.x)
      solver.suggestValue(this.minY, pos.y)
    } else {
      const halfMedium = Strength.create(0.0, 1.0, 0.0, 0.5)
      solver.createConstraint(this.minX, Operator.Eq, pos.x, halfMedium)
      solver.createConstraint(this.minY, Operator.Eq, pos.y, halfMedium)
      // const weaker = Strength.create(0.0, 0.0, 1.0, 0.5)
      // const weak = Strength.create(0.0, 0.0, 1.0)
      // const x = new Expr(
      //   this.minX,
      //   [-1, pos.x]
      // )
      // solver.createConstraint(x, Operator.Eq, 0, weaker)
      // solver.createConstraint(x, Operator.Ge, -30, weak)
      // solver.createConstraint(x, Operator.Le, 30, weak)

      // const y = new Expr(
      //   this.minY,
      //   [-1, pos.y]
      // )
      // solver.createConstraint(y, Operator.Eq, 0, weaker)
      // solver.createConstraint(y, Operator.Ge, -30, weak)
      // solver.createConstraint(y, Operator.Le, 30, weak)
    }

    if (parent) {
      parent.addChild(this)
    }
  }
}

function createLayoutConstraints(
  xyflow: XYFlowInstance,
  xyflowApi: XYStoreApi,
  draggingNodeId: string
) {
  const { parentLookup, nodeLookup } = xyflowApi.getState()
  const solver = new Solver()
  const rects = new Map<string, Leaf | Compound>()

  const traverse = new Array<{ xynode: InternalNode<XYFlowNode>; parent: Compound | null }>()

  for (const [, xynode] of nodeLookup) {
    if (isNullish(xynode.parentId)) {
      traverse.push({
        xynode,
        parent: null
      })
    }
  }

  while (traverse.length > 0) {
    const { xynode, parent } = traverse.shift()!
    const isDragging = xynode.dragging === true || xynode.id === draggingNodeId

    // Traverse children if the node is a compound, not dragging, and is an ancestor of the dragging node
    const shouldTraverse = !isDragging && xynode.type === 'compound' && isAncestor(xynode.id, draggingNodeId)

    const rect = shouldTraverse ? new Compound(solver, xynode, parent) : new Leaf(solver, xynode, parent, isDragging)
    rects.set(xynode.id, rect)

    if (shouldTraverse) {
      parentLookup.get(xynode.id)?.forEach(child => {
        traverse.push({
          xynode: child,
          parent: rect as Compound
        })
      })
    }
  }

  solver.updateVariables()
  solver.maxIterations = 1000

  function updateXYFlowNodes() {
    solver.updateVariables()

    xyflow.setNodes(nodes =>
      nodes.map((n) => {
        if (n.id === draggingNodeId || n.dragging === true) {
          return n
        }
        const rect = rects.get(n.id)
        if (!rect) {
          return n
        }
        const dimensions = rect.dimensions
        return {
          ...n,
          position: rect.position,
          width: dimensions.width,
          height: dimensions.height,
          measured: dimensions
        }
      })
    )
  }

  let animationFrameId: number | null = null

  /**
   * Move the editing node to the given position.
   */
  function onNodeDrag(xynode: XYFlowNode) {
    const pos = isInternalNodeBase(xynode) ? xynode.internals.positionAbsolute : xynode.position
    const rect = nonNullable(rects.get(xynode.id))
    solver.suggestValue(rect.minX, pos.x)
    solver.suggestValue(rect.minY, pos.y)
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    animationFrameId = requestAnimationFrame(() => {
      updateXYFlowNodes()
      animationFrameId = null
    })
  }

  return {
    onNodeDrag,
    updateXYFlowNodes
  }
}

type LayoutConstraints = Required<Pick<ReactFlowProps<XYFlowNode>, 'onNodeDragStart' | 'onNodeDrag' | 'onNodeDragStop'>>
/**
 * Keeps the layout constraints (parent nodes and children) when dragging a node
 */
export function useLayoutConstraints(): LayoutConstraints {
  const diagramApi = useDiagramStoreApi()
  const xyflowApi = useXYStoreApi()
  const solverRef = useRef<ReturnType<typeof createLayoutConstraints>>()

  return useMemo((): LayoutConstraints => ({
    onNodeDragStart: (_event, xynode) => {
      const { xyflow } = diagramApi.getState()
      solverRef.current = createLayoutConstraints(xyflow, xyflowApi, xynode.id)
    },
    onNodeDrag: (_event, xynode) => {
      invariant(solverRef.current, 'solverRef.current should be defined')
      solverRef.current?.onNodeDrag(xynode)
    },
    onNodeDragStop: (_event, _xynode) => {
      solverRef.current = undefined
    }
  }), [xyflowApi])
}