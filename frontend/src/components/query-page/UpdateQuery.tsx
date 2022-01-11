import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { Button, TextField, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { editMessage } from '../../api/demo'

export const UpdateQuery: FunctionComponent = () => {
  const [newMessageContent, setNewMessageContent] = useState('')
  const [results, setResults] = useState<any[]>([])

  const UserID: string = '000002'
  const MessageID: string = '000020'

  const onSubmit = async () => {
    const { data } = await editMessage(UserID, MessageID, newMessageContent)
    setResults(data)
  }

  return (
    <div>
      <Stack
        component='form'
        onSubmit={(e: any) => {
          e.preventDefault()
          onSubmit()
        }}
        style={{ display: 'flex', alignItems: 'center' }}
        direction='row'
        spacing={1}
      >
        <Chip label='UPDATE' color='primary' />
        <Chip label='message' color='secondary' />

        <Chip label='SET' color='primary' />
        <Chip label='new message content = ' color='secondary' />

        <TextField
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
        />

        <Button type='submit'>
          <Typography>Submit</Typography>
        </Button>
      </Stack>
      <div>{results}</div>
    </div>
  )
}
