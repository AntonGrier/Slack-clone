

import React, { useState } from 'react';
import axios from 'axios';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AttriuteContent, TableContent } from '.'
import { Operator, Condition } from '.'
import { FunctionComponent } from 'react'
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
import { loadMessagesDemo } from '../../api';

// TODO: handle states
export const SelectQuery: FunctionComponent = () => {

    //const [operator, setOperator] = React.useState('');
    const [text, setText] = React.useState('');
    const [singleChoice, setSingleChoice] = React.useState('');
    const [results, setResults] = React.useState<any[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setSingleChoice(event.target.value as string);
    };

    const onSubmit = async () => {
        console.log(singleChoice);
        if (Number(singleChoice) === 0) {
            const { data } = await loadMessagesDemo(text, -1)
            console.log(data);
            setResults(data);
        } else {
            const { data } = await loadMessagesDemo('-1', Number(text))
            console.log(data);
            setResults(data);
        }

    }


    return (
        <div>

            {/* $st = "SELECT MessageContent, TimePosted, ThreadID 
                  FROM messages m,
                  WHERE m.ChannelName = '" . $UserID . "' AND js.ServerID = s.ID"; */}
            <Stack direction="row" spacing={1}
                component='form'
                onSubmit={(e: any) => {
                    e.preventDefault()
                    onSubmit()
                }}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <Chip label="SELECT" color="primary" />

                <Chip label="MessageContent" color="secondary" />

                {/* <Chip label="TimePosted" color="secondary" /> */}

                <Chip label="ThreadID" color="secondary" />


                {/* <AttriuteContent chosenOptions={chosenOptions} setChosenOptions={setChosenOptions} /> */}

                <Chip label="FROM" color="primary" />

                <Chip label="message" color="secondary" />


                <Chip label="WHERE" color="primary" />

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="simple-select-label">Attribute</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={singleChoice}
                            label="choice"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>ChannelName</MenuItem>
                            <MenuItem value={1}>TimePosted</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* <Operator operator={operator} setOperator={setOperator} /> */}
                <Chip label="=" color="secondary" />

                <TextField id="standard-basic" label="Value" variant="standard" onChange={(e => setText(e.target.value))} value={text} />
                <Button type='submit'><Typography>Submit</Typography></Button>

            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>MessageContent</TableCell>
                        <TableCell>ThreadID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((res, idx) => (
                        <TableRow key={idx}>
                            <TableCell component='th' scope='row'>
                                {res.MessageContent}
                            </TableCell>
                            <TableCell>{res.ThreadID}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

// export const SingleAttriuteContent: FunctionComponent<AttributeProps> = (props) => {
//     const [singleChoice, setSingleChoice] = React.useState('');

//     const handleChange = (event: SelectChangeEvent) => {
//         setSingleChoice(event.target.value as string);
//     };

//     return (
//         <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//                 <InputLabel id="simple-select-label">Age</InputLabel>
//                 <Select
//                     labelId="simple-select-label"
//                     id="simple-select"
//                     value={singleChoice}
//                     label="choice"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//             </FormControl>
//         </Box>
//     );
// }
