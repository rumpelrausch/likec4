import { globalStyle, style } from '@vanilla-extract/css'
import { headerHeight } from '../components/view-page/Header.css'

// Index page

export const cssScrollArea = style({
  height: '100%'
})

globalStyle(`.${cssScrollArea} .mantine-ScrollArea-viewport`, {
  minHeight: '100%'
})

globalStyle(`.${cssScrollArea} .mantine-ScrollArea-viewport > div`, {
  minHeight: '100%',
  height: '100%'
})

export const cssCodeBlock = style({
  minHeight: '100%'
})
