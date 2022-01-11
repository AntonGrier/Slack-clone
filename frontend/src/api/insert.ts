import { apiPost } from './apiCall'

export const insertServer = (
  UserID: string,
  ServerName: string,
  ServerDescription: string,
) => apiPost({ insertServer: true, UserID, ServerName, ServerDescription })

export const insertChannel = (ChannelName: string, ServerID: string) =>
  apiPost({ insertChannel: true, ChannelName, ServerID })

export const insertGroupChannel = (
  ChannelName: string,
  ServerID: string,
  ChannelDescription: string,
) =>
  apiPost({
    insertGroupChannel: true,
    ChannelName,
    ServerID,
    ChannelDescription,
  })

export const insertDirectMessage = (ChannelName: string, ServerID: string) =>
  apiPost({ insertDirectMessage: true, ChannelName, ServerID })

export const insertThread = () => apiPost({ insertThread: true })

export const insertMessage = (
  UserID: string,
  MessageContent: string,
  TimePosted: number,
  ServerID: string,
  ChannelName: string,
  ThreadID: string | null,
) =>
  apiPost({
    insertMessage: true,
    UserID,
    MessageContent,
    TimePosted,
    ServerID,
    ChannelName,
    ThreadID,
  })

export const insertJoinsServer = (UserID: string, ServerID: string) =>
  apiPost({ insertJoinsServer: true, UserID, ServerID })

export const insertJoinsChannel = (
  UserID: string,
  ServerID: string,
  ChannelName: string,
) => apiPost({ insertJoinsChannel: true, UserID, ServerID, ChannelName })

export const insertModerates = (UserID: string, ServerID: string) =>
  apiPost({ insertModerates: true, UserID, ServerID })

export const insertEmoji = (EmojiName: string, Link: string) =>
  apiPost({ insertEmoji: true, EmojiName, Link })

export const insertReacts = (
  UserID: string,
  MessageID: string,
  EmojiName: string,
) => apiPost({ insertReacts: true, UserID, MessageID, EmojiName })
