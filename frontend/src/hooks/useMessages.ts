import { useUserContext } from '.'
import { loadMessages } from '../api'

export const useMessages = () => {
  const { setMessages, serverID, channelName } = useUserContext()

  const fetchMessages = async () => {
    const { data: messages } = await loadMessages(serverID, channelName)
    setMessages(messages)
  }

  return { fetchMessages }
}
