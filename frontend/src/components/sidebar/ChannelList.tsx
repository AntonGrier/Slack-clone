import { Collapse, List, ListItemButton, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import TagIcon from '@mui/icons-material/Tag'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { makeStyles } from '@mui/styles'
import { FunctionComponent, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useUserContext } from '../../hooks/store/UserStore'
import { loadChannels } from '../../api'
import { DirectChannel, GroupChannel } from '../../models'
import clsx from 'clsx'
import { UISkeleton } from '../../ui/UISkeleton'

const useStyles = makeStyles({
  root: {
    border: '0.5px solid #e5e6e8',
    borderRight: 0,
    flex: 3,
    width: '100%',
  },
  section: {
    marginTop: '10px',
  },
  subheader: {
    color: 'grey',
  },
  item: {
    paddingLeft: '10%',
    color: 'grey',
  },
  selectedItem: {
    background: '#10a8d6',
    color: 'white',
    '&:hover': {
      backgroundColor: '#36C5F0',
    },
  },
  itemImage: {
    marginRight: '5px',
  },
})

const BaseChannelList: FunctionComponent = () => {
  const { root, section, subheader, item, selectedItem, itemImage } =
    useStyles()
  const { userID, serverID, channelName, setChannelName } = useUserContext()
  const [fetchingChannels, setFetchingChannels] = useState(false)
  const [channels, setChannels] = useState<GroupChannel[]>([])
  const [dms, setDms] = useState<DirectChannel[]>([])
  const [openGroup, setOpenGroup] = useState(true)
  const [openDirect, setOpenDirect] = useState(true)

  useEffect(() => {
    const fetchChannels = async () => {
      setFetchingChannels(true)
      const { data: channels } = await loadChannels(userID, serverID)
      const { groupChannels: GroupChannels, directMessages: DirectMessages } =
        channels
      setChannels(GroupChannels)
      setDms(DirectMessages)
      setFetchingChannels(false)
    }
    fetchChannels()
  }, [serverID])

  return (
    <List className={root}>
      {fetchingChannels ? (
        <>
          <UISkeleton heights={Array(7).fill(30)} />
          <UISkeleton heights={Array(5).fill(0)} />
          <UISkeleton heights={Array(7).fill(30)} />
        </>
      ) : (
        <>
          <ListItemButton
            className={section}
            onClick={() => setOpenGroup((prev) => !prev)}
          >
            {openGroup ? (
              <ArrowDropUpIcon className={subheader} />
            ) : (
              <ArrowDropDownIcon className={subheader} />
            )}
            <Typography className={subheader} variant='subtitle1'>
              GROUP CHANNELS
            </Typography>
          </ListItemButton>
          <Collapse in={openGroup} timeout='auto' unmountOnExit>
            {channels.map((channel, idx) => (
              <ListItemButton
                onClick={() => setChannelName(channel.channelName)}
                className={clsx(
                  item,
                  channelName === channel.channelName && selectedItem,
                )}
                key={idx}
              >
                <TagIcon className={itemImage} />
                <Typography variant='subtitle1'>
                  {channel.channelName}
                </Typography>
              </ListItemButton>
            ))}
            <ListItemButton className={item}>
              <AddCircleIcon className={itemImage} style={{ color: 'black' }} />
              <Typography variant='subtitle1'>Add Channel</Typography>
            </ListItemButton>
          </Collapse>

          <ListItemButton
            className={section}
            onClick={() => setOpenDirect((prev) => !prev)}
          >
            {openDirect ? (
              <ArrowDropUpIcon className={subheader} />
            ) : (
              <ArrowDropDownIcon className={subheader} />
            )}
            <Typography className={subheader} variant='subtitle1'>
              DIRECT MESSAGES
            </Typography>
          </ListItemButton>
          <Collapse in={openDirect} timeout='auto' unmountOnExit>
            {dms.map((dm, idx) => (
              <ListItemButton
                onClick={() => setChannelName(dm.channelName)}
                className={clsx(
                  item,
                  channelName === dm.channelName && selectedItem,
                )}
                key={idx}
              >
                <AccountCircleIcon className={itemImage} />
                <Typography variant='subtitle1'>{dm.channelName}</Typography>
              </ListItemButton>
            ))}
            <ListItemButton className={item}>
              <AddCircleIcon className={itemImage} style={{ color: 'black' }} />
              <Typography variant='subtitle1'>Add DM</Typography>
            </ListItemButton>
          </Collapse>
        </>
      )}
    </List>
  )
}

export const ChannelList = observer(BaseChannelList)
