

import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AttriuteContent, TableContent } from '.'
import { Button, TextField } from '@mui/material';

// TODO: handle states
export function InsertQuery() {
    const [id, setId] = React.useState('');
    const [serverName, setServerName] = React.useState('');
    const [serverDescription, setServerDescription] = React.useState('');

    const handleIdChange = (e: any) => {
        // setText(e.target.value as string);
    }

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Chip label="INSERT INTO" color="primary" />

                
                <Chip label="server" color="secondary" />


                {/* <TableContent /> */}

                <Chip label="VALUES" color="primary" />
                <Chip label="ID = " color="secondary" />
                <Chip label="ServerName" color="secondary" />
                <Chip label="ServerDescription" color="secondary" />

                <TextField id="server-id" label="Value" variant="standard" onChange={handleIdChange} value={id} />
                {/* <TextField id="server-id" label="Value" variant="standard" onChange={handleTextChange} value={text} />
                <TextField id="server-id" label="Value" variant="standard" onChange={handleTextChange} value={text} /> */}
                {/* <Button type='submit' onSubmit={handleSubmit}>Submit</Button> */}
                
                {/* ID                  raw(16) DEFAULT sys_guid(),
    ServerName          VARCHAR(50),
    ServerDescription   VARCHAR(200),
    PRIMARY KEY (ID) */}
                {/* <AttriuteContent /> */}


            </Stack>
        </div>
    );
}


