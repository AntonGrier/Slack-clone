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
import { filterChannelsBySize } from '../../api'

const operators = ['greaterThan', 'lesserThan', 'equalTo']
const operatorSymbols = ['>', '<', '=']

const serverIDS = ['0001', '0002', '0003', '0004', '0005']

export function AggregationGroup() {
  const [operator, setOperator] = useState(operators[0])
  const [results, setResults] = useState<any[]>([])
  const [size, setSize] = useState(5)
  const [sID, setSID] = useState(serverIDS[2])

  const onSubmit = async () => {
    const { data } = await filterChannelsBySize(sID, size, operator, 'message')
    setResults(data)
  }

  return (
    <div>
      <Stack direction='row' spacing={1}>
        <Chip label='SELECT' color='primary' />

        <Chip label='ChannelName' color='secondary' />
        <Chip label='Count(*)' color='secondary' />

        <Chip label='FROM' color='primary' />

        <Chip label='message' color='secondary' />

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

        <Chip label='GROUP BY' color='primary' />
        <Chip label='ChannelName' color='secondary' />

        <Chip label='HAVING' color='primary' />
        <Chip label='Count(*)' color='secondary' />

        <Select
          value={operator}
          label='OP'
          onChange={(e) => setOperator(e.target.value)}
        >
          {operators.map((val, idx) => (
            <MenuItem value={val} key={idx}>
              {operatorSymbols[idx]}
            </MenuItem>
          ))}
        </Select>
        <TextField
          style={{ width: '50px' }}
          type='number'
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        ></TextField>
        <Button onClick={onSubmit}>
          <Typography>Submit</Typography>
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ChannelName</TableCell>
            <TableCell>Count(*)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(results || []).map((res, idx) => (
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
