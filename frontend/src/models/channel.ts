export interface GroupChannel {
  channelName: string
  channelDescription: string
}

export interface DirectChannel {
  channelName: string
}

export interface ChannelName {
  ChannelName: string
}

export interface ChannelResponse {
  groupChannels: GroupChannel[]
  directMessages: DirectChannel[]
}
