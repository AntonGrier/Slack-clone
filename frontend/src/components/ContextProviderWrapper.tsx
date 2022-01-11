import { FunctionComponent } from 'react'
import { UserStoreProvider } from '../hooks/store/UserStore'

export const ContextProviderWrapper: FunctionComponent = ({ children }) => {
  return <UserStoreProvider>{children}</UserStoreProvider>
}
