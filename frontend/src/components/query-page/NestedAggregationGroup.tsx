import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { getServerSize } from '../../api'

const serverIDS = ['0001', '0002', '0003', '0004', '0005']

export function NestedAggregationGroup() {
  const [results, setResults] = useState<any[]>([])
  const [sID, setSID] = useState(serverIDS[2])

  const onSubmit = async () => {
    const { data } = await getServerSize(sID)
    setResults(data)
  }

  return (
    <div>
      <Stack direction='row' spacing={1}>
        <Chip label='SELECT' color='primary' />

        <Chip label='ChannelName' color='secondary' />
        <Chip label='Count(*)' color='secondary' />

        <Chip label='FROM' color='primary' />

        <Chip label='joins_channel' color='secondary' />

        <Chip label='WHERE' color='primary' />

        <Chip label='ServerID' color='secondary' />

        <Chip label='=' color='primary' />
        <Select
          value={sID}
          label='sID'
          onChange={(e) => setSID(e.target.value)}
        >
          {serverIDS.map((val, idx) => (
            <MenuItem value={val} key={idx}>
              {serverIDS[idx]}
            </MenuItem>
          ))}
        </Select>

        <Chip label='AND' color='primary' />

        <Chip label='ChannelName' color='secondary' />

        <Chip label='NOT IN' color='primary' />

        <Chip label='NESTED' color='secondary' />

        <Chip label='GROUP BY' color='primary' />
        <Chip label='ChannelName' color='secondary' />
        <Button onClick={onSubmit}>
          <Typography>Submit</Typography>
        </Button>
      </Stack>
      <Stack style={{ marginTop: '10px' }} direction='row' spacing={1}>
        <Chip label='NESTED' color='secondary' />
        <Chip label='<=' />
        <Chip label='SELECT' color='primary' />
        <Chip label='ChannelName' color='secondary' />
        <Chip label='FROM' color='primary' />
        <Chip label='direct_message' color='secondary' />
        <Chip label='WHERE' color='primary' />
        <Chip label='ServerID' color='secondary' />

        <Chip label='=' color='primary' />
        <Select
          value={sID}
          label='sID'
          onChange={(e) => setSID(e.target.value)}
        >
          {serverIDS.map((val, idx) => (
            <MenuItem value={val} key={idx}>
              {serverIDS[idx]}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ChannelName</TableCell>
            <TableCell>Count(*)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((res, idx) => (
            <TableRow key={idx}>
              <TableCell>{res['ChannelName']}</TableCell>
              <TableCell>{res['COUNT(*)']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
