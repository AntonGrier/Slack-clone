

import React, { useState } from 'react';
import axios from 'axios';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export function Throwaway() {
    const [condition, setCondition] = React.useState('');
    const [operator, setOperator] = React.useState('');

    const handleChangeOperator = (event: SelectChangeEvent) => {
        setOperator(event.target.name as string);
    };
    const handleChangeCondition = (event: SelectChangeEvent) => {
        setCondition(event.target.name as string);
    };

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Chip label="SELECT" color="primary" />
                <Chip label="FROM" color="primary" />
                <Chip label="WHERE" color="primary" />
                

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="condition-select-label">Condition</InputLabel>
                        <Select
                            labelId="condition-select-label"
                            id="condition-select"
                            value={condition}
                            label="condition"
                            onChange={handleChangeCondition}
                        >
                            <MenuItem value={0}>NONE</MenuItem>
                            <MenuItem value={1}>AND</MenuItem>
                            <MenuItem value={2}>OR</MenuItem>
                        </Select>
                    </FormControl>
                </Box>


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
            </Stack>
        </div>
    );
}


