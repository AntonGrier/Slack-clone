import { ChannelName, Message, ServerInfo } from '../models'
import { apiGet } from './apiCall'

export const searchMessages = (ServerID: string, QueryStr: string) =>
  apiGet<Message[]>('searchMessages', {
    ServerID,
    QueryStr,
  })

export const searchChannels = (
  UserID: string,
  ServerID: string,
  QueryStr: string,
) =>
  apiGet<ChannelName[]>('searchChannels', {
    UserID,
    ServerID,
    QueryStr,
  })

export const searchServers = (UserID: string, QueryStr: string) =>
  apiGet<ServerInfo[]>('searchServers', {
    UserID,
    QueryStr,
  })
