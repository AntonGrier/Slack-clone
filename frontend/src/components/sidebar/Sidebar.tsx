import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FunctionComponent, useState } from 'react'
import { SidebarContent } from './SidebarContent'
import { useUserContext } from '../../hooks'
import { observer } from 'mobx-react'
import { Search } from '../search'
import { Button } from '@mui/material'
import { navigate } from '@reach/router'

const drawerWidth = 300
const BaseSidebar: FunctionComponent = ({ children }) => {
  const { serverName } = useUserContext()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div
      style={{
        height: '100%',
        background: '#f8f8fa',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h5'
          style={{
            fontWeight: 'bold',
            color: 'grey',
            textAlign: 'center',
          }}
        >
          {serverName}
        </Typography>
      </Toolbar>
      <SidebarContent />
    </div>
  )

  return (
    <Box sx={{ display: 'flex', height: '92%' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Search />
          <Button
            style={{
              background: '#e0e0e0',
              color: 'black',
              borderRadius: '10px',
            }}
            onClick={() => navigate('/dashboard')}
          >
            <Typography
              variant='h6'
              style={{ justifySelf: 'flex-end', fontWeight: 'bold' }}
            >
              Dashboard
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        style={{ height: '100%' }}
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          // p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100%',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export const Sidebar = observer(BaseSidebar)
