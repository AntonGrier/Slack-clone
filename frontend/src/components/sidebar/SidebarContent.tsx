import { makeStyles } from '@mui/styles'
import { FunctionComponent } from 'react'
import { ChannelList } from './ChannelList'
import { ServerList } from './ServerList'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
  },
})

export const SidebarContent: FunctionComponent = () => {
  const { root } = useStyles()

  return (
    <div className={root}>
      <ServerList />
      <ChannelList />
    </div>
  )
}
