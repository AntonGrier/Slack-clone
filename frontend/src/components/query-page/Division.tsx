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
import { useState } from 'react'
import { getUsersWhoAreInAllChannels } from '../../api'

const serverIDS = ['0001', '0002', '0003', '0004', '0005']
export const Division = () => {
  const [results, setResults] = useState<any[]>([])
  const [sID, setSID] = useState(serverIDS[0])

  const onSubmit = async () => {
    const { data } = await getUsersWhoAreInAllChannels(sID)
    setResults(data)
  }

  return (
    <div>
      <Typography style={{ fontWeight: 'bold' }}>
        Get users who are in all channels of a server
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Select server:</Typography>
        <Select
          size='small'
          value={sID}
          label='Select Server'
          onChange={(e) => setSID(e.target.value)}
        >
          {serverIDS.map((val, idx) => (
            <MenuItem value={val} key={idx}>
              {serverIDS[idx]}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Button onClick={onSubmit}>
        <Typography>Submit</Typography>
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>UserEmail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((res, idx) => (
            <TableRow key={idx}>
              <TableCell>{res['FirstName']}</TableCell>
              <TableCell>{res['LastName']}</TableCell>
              <TableCell>{res['UserEmail']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
