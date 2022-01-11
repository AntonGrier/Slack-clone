import { Router } from '@reach/router'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './../ui'
import { FunctionComponent } from 'react'
import { GetStartedPage, LoginPage, SignUpPage } from './auth'
import { Content } from './Content'
import { ContextProviderWrapper } from './ContextProviderWrapper'
import { VerticalTabs } from './query-page'

export const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <ContextProviderWrapper>
        <Router id='router'>
          <Content path='/' />
          <GetStartedPage path='get-started' />
          <LoginPage path='login' />
          <SignUpPage path='sign-up' />
          <VerticalTabs path='dashboard' />
        </Router>
      </ContextProviderWrapper>
    </ThemeProvider>
  )
}
