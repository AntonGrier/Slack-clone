import { apiGet } from './apiCall'
import { apiPost } from './apiCall'

// JOIN QUERY
export const searchMessagesDemo = (QueryStr: string) =>
  apiGet<any>('searchMessagesDemo', {
    QueryStr,
  })

// AGGREGATION WTIH GROUP BY
export const getServerSize = (ServerID: string) =>
  apiGet<any>('getServerSize', {
    ServerID,
    sizeMeasure: 'user',
  })

// AGGREGATION WTIH HAVING
export const filterChannelsBySize = (
  ServerID: string,
  size: number,
  operator: string,
  sizeMeasure: string,
) =>
  apiGet<any>('filterChannelsBySize', {
    ServerID,
    sizeMeasure,
    size,
    operator,
  })

export const getUsersWhoAreInAllChannels = (ServerID: string) =>
  apiGet<any>('getUsersWhoAreInAllChannels', {
    ServerID,
  })

export const deleteMessage = (UserID: string, MessageID: string) =>
  apiPost(undefined, { opCode: 'deleteSentMessage', UserID, MessageID })
//Update message

export const editMessage = (
  UserID: string,
  MessageID: string,
  newMessageContent: string,
) => apiPost({ opCode: 'editMessage', UserID, MessageID, newMessageContent })
