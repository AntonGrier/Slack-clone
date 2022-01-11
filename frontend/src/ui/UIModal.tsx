import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { FunctionComponent } from 'react'

interface ModalProps {
  open: boolean
  handleClose: () => void
  fullscreen?: boolean
}

export const UIModal: FunctionComponent<ModalProps> = ({
  open,
  handleClose,
  fullscreen = false,
  children,
}) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{ width: fullscreen ? '60%' : undefined }}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {children}
        </Box>
      </Modal>
    </div>
  )
}
