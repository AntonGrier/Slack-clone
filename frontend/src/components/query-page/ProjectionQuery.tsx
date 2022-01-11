

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
import { loadMessagesDemo, loadMessagesProjectionDemo } from '../../api';

// TODO: handle states
export const ProjectionQuery: FunctionComponent = () => {

    const [results, setResults] = React.useState<any[]>([]);
    const ChannelName = 'memes';

    const onSubmit = async () => {
        const { data } = await loadMessagesProjectionDemo(ChannelName)
        setResults(data);
    }


    return (
        <div>

{/* ID                  raw(16) DEFAULT sys_guid(),
    UserID              raw(16) NOT NULL,
    MessageContent      VARCHAR(500),
    TimePosted          INTEGER NOT NULL,
    ServerID            raw(16) NOT NULL,
    ChannelName         VARCHAR(50) NOT NULL,
    004 ---:> serverID
    ThreadID            raw(16), */}
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
                <Chip label="TimePosted" color="secondary" />
                <Chip label="ChannelName" color="secondary" />
                <Chip label="ThreadID" color="secondary" />

                <Chip label="FROM" color="primary" />

                <Chip label="message" color="secondary" />


                <Chip label="WHERE" color="primary" />


                {/* <Operator operator={operator} setOperator={setOperator} /> */}
                <Chip label="ChannelName = 'memes'" color="secondary" />

                <Button type='submit'>
          <Typography>Submit</Typography>
        </Button>

            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>MessageContent</TableCell>
                        <TableCell>TimePosted</TableCell>
                        <TableCell>ChannelName</TableCell>
                        <TableCell>ThreadID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((res, idx) => (
                        <TableRow key={idx}>
                            <TableCell component='th' scope='row'>
                                {res.MessageContent}
                            </TableCell>
                            <TableCell>{res.TimePosted}</TableCell>
                            <TableCell>{res.ChannelName}</TableCell>
                            <TableCell>{res.ThreadID}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
