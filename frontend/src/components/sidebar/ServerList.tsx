import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
import { List, ListItemButton, Skeleton } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { useUserContext } from '../../hooks/store/UserStore'
import { observer } from 'mobx-react'
import clsx from 'clsx'
import { loadServers } from '../../api'
import { AddServerModal } from './AddServerModal'

const useStyles = makeStyles({
  root: {
    border: '0.5px solid #e5e6e8',
    height: '100%',
    flex: 1,
  },
  channelButton: {
    margin: '5px',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  selectedChannel: {
    background: '#10a8d6',
    color: 'white',
    '&:hover': {
      backgroundColor: '#36C5F0',
    },
  },
})

const BaseServerList: FunctionComponent = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { root, channelButton, selectedChannel } = useStyles()
  const {
    userID,
    servers,
    serverID,
    setServerID,
    setServers,
    setChannelName,
    setMessages,
    setServerName,
  } = useUserContext()

  useEffect(() => {
    const fetchServers = async () => {
      const { data: servers } = await loadServers(userID)
      setServers(servers)
    }
    fetchServers()
  }, [userID])

  return !servers.length ? (
    <Skeleton />
  ) : (
    <List className={root}>
      {servers.map((server, idx) => (
        <ListItemButton
          key={idx}
          onClick={() => {
            setServerName(server.ServerName)
            setServerID(server.ServerID)
            setChannelName('')
            setMessages([])
          }}
          className={clsx(
            channelButton,
            serverID === server.ServerID && selectedChannel,
          )}
        >
          {server.ServerName.length ? server.ServerName[0] : 'S'}
        </ListItemButton>
      ))}
      <ListItemButton onClick={handleOpen} className={channelButton}>
        <AddIcon />
      </ListItemButton>
      <AddServerModal open={open} handleClose={handleClose} />
    </List>
  )
}

export const ServerList = observer(BaseServerList)
