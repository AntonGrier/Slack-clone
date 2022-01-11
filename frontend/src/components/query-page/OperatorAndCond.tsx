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
import { FunctionComponent } from 'react'

interface OperatorProps {
    operator: string,
    setOperator: (value: string) => void
}


export const Operator: FunctionComponent<OperatorProps> = (props) => {
    // const [operator, setOperator] = React.useState('');
    const { operator, setOperator } = props;

    const handleChangeOperator = (event: SelectChangeEvent) => {
        setOperator(event.target.value as string);
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

interface ConditionProps {
    condition: string,
    setCondition: (value: string) => void
}

export const Condition: FunctionComponent<ConditionProps> = (props) => {

    // const [condition, setCondition] = React.useState('');

    const { condition, setCondition } = props;

    const handleChangeCondition = (event: SelectChangeEvent) => {
        setCondition(event.target.name as string);
    };

    return (

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
    );

}

