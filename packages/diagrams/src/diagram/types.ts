import type { ThemeColor as ElementStyleColor } from '@likec4/core'

export type DiagramPaddings = number | [top: number, right: number, bottom: number, left: number]

export interface ThemeColors {
  fill: string
  stroke: string
  hiContrast: string
  loContrast: string
}

export interface DiagramTheme {
  font: string
  shadow: string
  relation: {
    lineColor: string
    labelColor: string
  }
  colors: {
    [key in ElementStyleColor]: ThemeColors
  }
}
