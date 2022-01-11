import { ChannelResponse, Message, ServerInfo } from '../models'
import { apiGet } from './apiCall'

export const loadServers = (UserID: string) =>
  apiGet<ServerInfo[]>('loadServers', {
    UserID,
  })

export const loadChannels = (UserID: string, ServerID: string) =>
  apiGet<ChannelResponse>('loadChannels', {
    UserID,
    ServerID,
  })

export const loadMessages = (ServerID: string, ChannelName: string) =>
  apiGet<Message[]>('loadMessages', { ServerID, ChannelName })

export const loadMessagesDemo = (ChannelName: string, TimePosted: number) =>
  apiGet<Message[]>('loadMessagesDemo', { ChannelName, TimePosted })

export const loadMessagesProjectionDemo = (ServerID: string) =>
  apiGet<Message[]>('loadMessagesProjectionDemo', { ServerID })

// export const selectChannel = (ServerName: string, ServerDescription: string) =>
//   apiGet({ selectChannel: true, ServerName, ServerDescription })

// export const selectMessage = (ChannelName: string, ServerID: string) =>
//   apiGet({ selectMessage: true, ChannelName, ServerID })

// export const selectUserGroupByServer = (
//   ChannelName: string,
//   ServerID: string,
//   ChannelDescription: string,
// ) =>
//   apiGet({
//     selectUserGroupByServer: true,
//     ChannelName,
//     ServerID,
//     ChannelDescription,
//   })

// export const countUserInServer = (UserID: string, ServerID: string) =>
//   apiGet({ countUserInServer: true, UserID, ServerID })

// export const countUserInChannel = (
//   UserID: string,
//   ServerID: string,
//   ChannelName: string,
// ) =>
//   apiGet({
//     countUserInChannel: true,
//     UserID,
//     ServerID,
//     ChannelName,
//   })

// export const selectUserGroupByChannel = (
//   UserID: string,
//   ServerID: string,
//   ChannelName: string,
// ) => apiGet({ selectUserGroupByChannel: true, UserID, ServerID, ChannelName })
