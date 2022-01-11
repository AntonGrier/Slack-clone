import { FunctionComponent, RefObject, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import { IconButton, TextareaAutosize } from '@mui/material'
import { insertMessage } from '../../api'
import { useMessages, useUserContext } from '../../hooks'
import { observer } from 'mobx-react'

interface MessagesTerminalProps {
  bottomRef: RefObject<HTMLDivElement>
}

const BaseMessageTerminal: FunctionComponent<MessagesTerminalProps> = ({
  bottomRef,
}) => {
  const [message, setMessage] = useState('')
  const [inFocus, setInFocus] = useState(false)
  const { userID, serverID, channelName } = useUserContext()
  const { fetchMessages } = useMessages()

  const scrollToBottom = () =>
    bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'auto' })

  const onSubmit = async () => {
    if (message.trim() !== '') {
      setMessage('')
      await insertMessage(
        userID,
        message.trim(),
        Date.now(),
        serverID,
        channelName,
        null,
      )
      await fetchMessages()
      scrollToBottom()
    }
  }
  const keyHander = (e: any) => {
    if (e.keyCode === 13 && e.ctrlKey && inFocus) onSubmit()
  }

  useEffect(() => {
    window.addEventListener('keydown', keyHander)
    return () => {
      window.removeEventListener('keydown', keyHander)
    }
  }, [message, inFocus])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextareaAutosize
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Enter Message'
        style={{ width: '100%', resize: 'none' }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onSubmit}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  )
}

export const MessageTerminal = observer(BaseMessageTerminal)
