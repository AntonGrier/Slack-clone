import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#59cff3',
      main: '#36C5F0',
      dark: '#10a8d6',
    },
    error: {
      main: '#D40E0D',
    },
  },
  typography: {
    fontFamily: ['Lexend', 'Roboto', 'Arial'].join(','),
  },
})
