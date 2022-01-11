import { action, makeAutoObservable, observable } from 'mobx'
import { createContext, FunctionComponent, useContext } from 'react'
import { getCachedUser } from '../../helpers/cacheUser'
import { Message, ServerInfo } from '../../models'

export interface IUserStore {
  userID: string
  serverID: string
  serverName: string
  servers: ServerInfo[]
  messages: Message[]
  setUserID: (userID: string) => void
  setServerID: (serverID: string) => void
  setServerName: (serverName: string) => void
  setServers: (server: ServerInfo[]) => void
  setMessages: (messages: Message[]) => void
  setChannelName: (channelName: string) => void
}

export class UserStore implements IUserStore {
  @observable userID = getCachedUser() ?? ''
  @observable serverName = ''
  @observable serverID = ''
  @observable channelName = ''
  @observable servers: ServerInfo[] = []
  @observable messages: Message[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action setUserID = (userID: string) => {
    this.userID = userID
  }
  @action setServerID = (serverID: string) => {
    this.serverID = serverID
  }
  @action setServerName = (serverName: string) => {
    this.serverName = serverName
  }
  @action setServers = (servers: ServerInfo[]) => {
    this.servers = servers
  }
  @action setMessages = (messages: Message[]) => {
    this.messages = messages
  }
  @action setChannelName = (channelName: string) => {
    this.channelName = channelName
  }
}

const userStore = new UserStore()
export const UserStoreContext = createContext<UserStore>(userStore)
export const useUserContext = () => useContext(UserStoreContext)

export const UserStoreProvider: FunctionComponent = ({ children }) => (
  <UserStoreContext.Provider value={userStore}>
    {children}
  </UserStoreContext.Provider>
)
