import type { ComputedView, DiagramView } from '@likec4/core'

export const fakeDiagram: DiagramView = {
  edges: [
    {
      headArrow: [
        [294, 487],
        [291, 496],
        [288, 487]
      ],
      id: 'cloud.frontend:cloud.backend',
      label: 'requests',
      labelBox: {
        align: 'left',
        width: 62,
        x: 295,
        y: 459
      },
      points: [
        [291, 406],
        [291, 432],
        [291, 461],
        [291, 487]
      ],
      relations: [
        'cloud.frontend.dashboard:cloud.backend.graphql',
        'cloud.frontend.adminPanel:cloud.backend.graphql'
      ],
      source: 'cloud.frontend',
      target: 'cloud.backend'
    },
    {
      headArrow: [
        [294, 701],
        [291, 711],
        [288, 701]
      ],
      id: 'cloud.backend:amazon',
      label: null,
      labelBox: null,
      points: [
        [291, 641],
        [291, 660],
        [291, 681],
        [291, 702]
      ],
      relations: ['cloud.backend.storage:amazon.s3'],
      source: 'cloud.backend',
      target: 'amazon'
    },
    {
      headArrow: [
        [344, 257],
        [336, 263],
        [338, 253]
      ],
      id: 'support:cloud.frontend',
      label: null,
      labelBox: null,
      points: [
        [413, 141],
        [391, 176],
        [364, 218],
        [342, 255]
      ],
      relations: ['support:cloud.frontend.adminPanel'],
      source: 'support',
      target: 'cloud.frontend'
    },
    {
      headArrow: [
        [244, 253],
        [246, 263],
        [239, 257]
      ],
      id: 'customer:cloud.frontend',
      label: 'opens',
      labelBox: {
        align: 'left',
        width: 44,
        x: 208,
        y: 193
      },
      points: [
        [169, 141],
        [191, 176],
        [218, 218],
        [241, 255]
      ],
      relations: ['customer:cloud.frontend.dashboard'],
      source: 'customer',
      target: 'cloud.frontend'
    }
  ],
  height: 855,
  id: 'fakeView',
  nodes: [
    {
      children: [],
      color: 'primary',
      id: 'amazon',
      parent: null,
      position: [165, 715],
      relative: [165, 715],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'amazon'
    },
    {
      children: ['cloud.backend', 'cloud.frontend'],
      color: 'primary',
      id: 'cloud',
      parent: null,
      position: [139, 210],
      relative: [139, 210],
      shape: 'rectangle',
      size: {
        height: 457,
        width: 304
      },
      title: 'cloud'
    },
    {
      children: [],
      color: 'primary',
      id: 'customer',
      parent: null,
      position: [0, 0],
      relative: [0, 0],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'customer'
    },
    {
      children: [],
      color: 'primary',
      id: 'support',
      parent: null,
      position: [330, 0],
      relative: [330, 0],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'support'
    },
    {
      children: [],
      color: 'primary',
      id: 'cloud.backend',
      parent: 'cloud',
      position: [165, 500],
      relative: [26, 290],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'backend'
    },
    {
      children: [],
      color: 'primary',
      id: 'cloud.frontend',
      parent: 'cloud',
      position: [165, 266],
      relative: [26, 56],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'frontend'
    }
  ],
  rules: [
    {
      exprs: [
        {
          wildcard: true
        }
      ],
      isInclude: true
    }
  ],
  title: '',
  viewOf: 'cloud',
  width: 582
} as any

export const fakeDiagram2: DiagramView = {
  edges: [
    {
      headArrow: [
        [129, 456],
        [126, 465],
        [123, 456]
      ],
      id: 'system.frontend:system.backend',
      label: 'requests',
      labelBox: {
        align: 'left',
        width: 62,
        x: 130,
        y: 428
      },
      points: [
        [126, 375],
        [126, 400],
        [126, 429],
        [126, 456]
      ],
      relations: ['671e3db5eb605d5f245f247d95925bd0953e0e4c'],
      source: 'system.frontend',
      target: 'system.backend'
    },
    {
      headArrow: [
        [129, 221],
        [126, 231],
        [123, 221]
      ],
      id: 'client:system.frontend',
      label: 'opens',
      labelBox: {
        align: 'left',
        width: 44,
        x: 130,
        y: 193
      },
      points: [
        [126, 141],
        [126, 166],
        [126, 195],
        [126, 221]
      ],
      relations: ['99bffdfd5c78e024393e6223cd9b19225321a5e3'],
      source: 'client',
      target: 'system.frontend'
    }
  ],
  height: 609,
  id: '74f5364fa4b',
  nodes: [
    {
      children: [],
      color: 'primary',
      id: 'client',
      parent: null,
      position: [0, 0],
      relative: [0, 0],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'client'
    },
    {
      children: [],
      color: 'primary',
      id: 'system.backend',
      parent: null,
      position: [0, 469],
      relative: [0, 469],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'backend'
    },
    {
      children: [],
      color: 'primary',
      id: 'system.frontend',
      parent: null,
      position: [0, 235],
      relative: [0, 235],
      shape: 'rectangle',
      size: {
        height: 140,
        width: 251
      },
      title: 'frontend'
    }
  ],
  rules: [
    {
      exprs: [
        {
          wildcard: true
        }
      ],
      isInclude: true
    }
  ],
  title: 'frontend',
  viewOf: 'system.frontend',
  width: 251
} as any

export const fakeComputedView3Levels: ComputedView = {
  edges: [
    {
      id: 'cloud.frontend.dashboard:cloud.backend.graphql',
      label: null,
      relations: ['cloud.frontend.dashboard:cloud.backend.graphql'],
      source: 'cloud.frontend.dashboard',
      target: 'cloud.backend.graphql'
    },
    {
      id: 'cloud.frontend.adminPanel:cloud.backend.graphql',
      label: null,
      relations: ['cloud.frontend.adminPanel:cloud.backend.graphql'],
      source: 'cloud.frontend.adminPanel',
      target: 'cloud.backend.graphql'
    },
    {
      id: 'cloud.backend.storage:amazon',
      label: null,
      relations: ['cloud.backend.storage:amazon.s3'],
      source: 'cloud.backend.storage',
      target: 'amazon'
    },
    {
      id: 'cloud.backend.graphql:cloud.backend.storage',
      label: null,
      relations: ['cloud.backend.graphql:cloud.backend.storage'],
      source: 'cloud.backend.graphql',
      target: 'cloud.backend.storage'
    },
    {
      id: 'support:cloud.frontend.adminPanel',
      label: null,
      relations: ['support:cloud.frontend.adminPanel'],
      source: 'support',
      target: 'cloud.frontend.adminPanel'
    },
    {
      id: 'customer:cloud.frontend.dashboard',
      label: null,
      relations: ['customer:cloud.frontend.dashboard'],
      source: 'customer',
      target: 'cloud.frontend.dashboard'
    }
  ],
  id: 'cloud3levels',
  nodes: [
    {
      children: [],
      color: 'primary',
      id: 'amazon',
      parent: null,
      shape: 'rectangle',
      title: 'amazon'
    },
    {
      children: ['cloud.backend', 'cloud.frontend.adminPanel', 'cloud.frontend.dashboard'],
      color: 'primary',
      id: 'cloud',
      navigateTo: 'fakeView',
      parent: null,
      shape: 'rectangle',
      title: 'cloud'
    },
    {
      children: [],
      color: 'primary',
      id: 'customer',
      parent: null,
      shape: 'rectangle',
      title: 'customer'
    },
    {
      children: [],
      color: 'primary',
      id: 'support',
      parent: null,
      shape: 'rectangle',
      title: 'support'
    },
    {
      children: ['cloud.backend.graphql', 'cloud.backend.storage'],
      color: 'primary',
      id: 'cloud.backend',
      parent: 'cloud',
      shape: 'rectangle',
      title: 'backend'
    },
    {
      children: [],
      color: 'primary',
      id: 'cloud.backend.graphql',
      parent: 'cloud.backend',
      shape: 'rectangle',
      title: 'graphql'
    },
    {
      children: [],
      color: 'primary',
      id: 'cloud.backend.storage',
      parent: 'cloud.backend',
      shape: 'rectangle',
      title: 'storage'
    },
    {
      children: [],
      color: 'primary',
      id: 'cloud.frontend.adminPanel',
      parent: 'cloud',
      shape: 'rectangle',
      title: 'adminPanel'
    },
    {
      children: [],
      color: 'primary',
      id: 'cloud.frontend.dashboard',
      parent: 'cloud',
      shape: 'rectangle',
      title: 'dashboard'
    }
  ],
  rules: [
    {
      exprs: [
        {
          wildcard: true
        },
        {
          element: 'cloud.frontend',
          isDescedants: true
        },
        {
          element: 'cloud.backend',
          isDescedants: true
        }
      ],
      isInclude: true
    },
    {
      exprs: [
        {
          element: 'cloud.frontend',
          isDescedants: false
        }
      ],
      isInclude: false
    }
  ],
  title: 'Context: Cloud',
  viewOf: 'cloud'
} as any
