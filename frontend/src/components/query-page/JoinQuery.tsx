import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { searchMessagesDemo } from '../../api'
import { FunctionComponent, useState } from 'react'

export const JoinQuery: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<any[]>([])

  const onSubmit = async () => {
    const { data } = await searchMessagesDemo(searchTerm)
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
        <Chip label='SELECT' color='primary' />
        <Chip label='p.FirstName' color='secondary' />
        <Chip label='p.LastName' color='secondary' />
        <Chip label='m.MessageContent' color='secondary' />

        <Chip label='FROM' color='primary' />
        <Chip label='message m' color='secondary' />
        <Chip label='profile p' color='secondary' />
        <Chip label='WHERE' color='primary' />
        <Chip label='p.UserID = m.UserID' color='secondary' />
        <Chip label='AND' color='primary' />
        <Chip label='MessageContent' color='secondary' />
        <Chip label='LIKE' color='primary' />
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button type='submit'>
          <Typography>Submit</Typography>
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>MessageContent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((res, idx) => (
            <TableRow key={idx}>
              <TableCell component='th' scope='row'>
                {res.FirstName}
              </TableCell>
              <TableCell>{res.LastName}</TableCell>
              <TableCell>{res.MessageContent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
