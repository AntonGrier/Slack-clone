

import React, { useState } from 'react';
import axios from 'axios';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AttriuteContent, TableContent } from '.'

// TODO: handle states
export function DeleteQuery() {

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Chip label="DELETE" color="primary" />

                <Chip label="FROM" color="primary" />

                {/* <TableContent /> */}

                <Chip label="WHERE" color="primary" />

                {/* <AttriuteContent /> */}
                <Op />

            </Stack>
        </div>
    );
}

export function Op() {
    const [operator, setOperator] = React.useState('');

    const handleChangeOperator = (event: SelectChangeEvent) => {
        setOperator(event.target.name as string);
    };

    return (

        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="operator-select-label">Operator</InputLabel>
                <Select
                    labelId="operator-select-label"
                    id="operator-select"
                    value={operator}
                    label="operator"
                    onChange={handleChangeOperator}
                >
                    <MenuItem value={0}>NONE</MenuItem>
                    <MenuItem value={1}>=</MenuItem>
                    <MenuItem value={2}>&lt;</MenuItem>
                    <MenuItem value={3}>&gt;</MenuItem>
                    <MenuItem value={4}>&lt;=</MenuItem>
                    <MenuItem value={5}>&gt;=</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );

}


