import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { FunctionComponent, RefObject, useEffect, useState } from 'react'
import { useMessages, useUserContext } from '../../hooks'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { observer } from 'mobx-react'
import makeStyles from '@mui/styles/makeStyles'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { deleteMessage } from '../../api'
import { Message } from '../../models'

const useStyles = makeStyles({
  root: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
})

interface MessagesProps {
  bottomRef: RefObject<HTMLDivElement>
}

const BaseMessages: FunctionComponent<MessagesProps> = ({ bottomRef }) => {
  const { serverID, userID, channelName, messages } = useUserContext()
  const { fetchMessages } = useMessages()
  const { root } = useStyles()

  const handleDelete = async (message: Message) => {
    await deleteMessage(userID, message.MessageID.toUpperCase())
    fetchMessages()
  }

  useEffect(() => {
    if (serverID !== '' && channelName !== '') fetchMessages()
  }, [serverID, channelName])

  const Message: FunctionComponent<{ message: Message }> = ({ message }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
    }

    return (
      <div style={{ display: 'flex', margin: '15px' }}>
        <AccountBoxIcon style={{ width: '50px', height: '50px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <Typography
              style={{ fontWeight: 'bold' }}
            >{`${message.FirstName} ${message.LastName}`}</Typography>
            <div>
              <IconButton
                style={{
                  width: '20px',
                  height: '20px',
                  marginLeft: '10px',
                }}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    handleDelete(message)
                    handleClose()
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Typography>{message.MessageContent}</Typography>
        </div>
      </div>
    )
  }

  return (
    <div className={root}>
      <div ref={bottomRef} />
      {messages
        .slice()
        .reverse()
        .map((message, idx) => (
          <Message key={idx} message={message} />
        ))}
    </div>
  )
}

export const Messages = observer(BaseMessages)
