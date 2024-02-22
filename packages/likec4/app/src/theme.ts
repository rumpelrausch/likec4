import { Button, createTheme, type MantineTheme } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'var(--default-font-family)',
  headings: {
    fontWeight: '500',
    sizes: {
      h1: {
        // fontSize: '2rem',
        fontWeight: '600'
      },
      h2: {
        // fontSize: '1.85rem',
      }
    }
  },
  components: {
    Button: Button.extend({})
  }
}) as MantineTheme
