import {
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { FunctionComponent, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { UIModal } from '../../ui'
import { searchChannels, searchMessages, searchServers } from '../../api/search'
import { useUserContext } from '../../hooks'
import { ChannelName, Message, ServerInfo } from '../../models'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export const Search: FunctionComponent = () => {
  const { userID, serverID, setServerID, setChannelName, setServerName } =
    useUserContext()
  const [searchValue, setSearchValue] = useState('')
  const [searchParam, setSearchParam] = useState('messages')
  const [open, setOpen] = useState(false)

  const [messageRes, setMessageRes] = useState<Message[]>([])
  const [channelRes, setChannelRes] = useState<ChannelName[]>([])
  const [serverRes, setServerRes] = useState<ServerInfo[]>([])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearch = async () => {
    switch (searchParam) {
      case 'messages':
        const { data: messages } = await searchMessages(serverID, searchValue)
        setMessageRes(messages)
        break
      case 'channels':
        const { data: channels } = await searchChannels(
          userID,
          serverID,
          searchValue,
        )
        setChannelRes(channels)
        break
      case 'servers':
        const { data: servers } = await searchServers(userID, searchValue)
        setServerRes(servers)
        break
    }
  }

  return (
    <>
      <Button
        variant='outlined'
        onClick={handleOpen}
        style={{
          background: '#e0e0e0',
          color: 'black',
          borderRadius: '10px',
        }}
      >
        <Typography style={{ fontWeight: 'bold' }} variant='h6'>
          Search
        </Typography>
      </Button>
      <UIModal fullscreen open={open} handleClose={handleClose}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Paper
            component='form'
            onSubmit={(e: any) => {
              e.preventDefault()
              handleSearch()
            }}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '80%',
            }}
          >
            <Tabs
              value={searchParam}
              onChange={(_, value) => setSearchParam(value)}
            >
              <Tab value='messages' label='messages' />
              <Tab value='channels' label='Channels' />
              <Tab value='servers' label='Servers' />
            </Tabs>
            <Divider style={{ margin: '0 10px' }} orientation='vertical' />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
          <div style={{ width: '80%', height: '700px', overflowY: 'auto' }}>
            {(messageRes.length && searchParam) === 'messages' &&
              messageRes.map((message, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    margin: '15px',
                  }}
                >
                  <AccountBoxIcon style={{ width: '50px', height: '50px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='caption'>
                      {`#${message.ChannelName}`}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold' }}
                    >{`${message.FirstName} ${message.LastName}`}</Typography>
                    <Typography>{message.MessageContent}</Typography>
                  </div>
                </div>
              ))}
            {(channelRes.length && searchParam) === 'channels' && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {channelRes.map((channel, idx) => (
                  <Button
                    key={idx}
                    style={{ margin: '5px' }}
                    onClick={() => {
                      setChannelName(channel.ChannelName)
                      handleClose()
                    }}
                  >
                    <Typography variant='h6'>{`# ${channel.ChannelName}`}</Typography>
                  </Button>
                ))}
              </div>
            )}
            {(serverRes.length && searchParam) === 'servers' && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {serverRes.map((server, idx) => (
                  <Button
                    key={idx}
                    onClick={() => {
                      setServerID(server.ServerID)
                      setServerName(server.ServerName)
                      setChannelName('')
                      handleClose()
                    }}
                    style={{
                      margin: '5px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant='h6'>{`${server.ServerName}`}</Typography>
                    <Typography variant='subtitle2'>{`${server.ServerDescription}`}</Typography>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </UIModal>
    </>
  )
}
