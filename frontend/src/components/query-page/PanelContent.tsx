import * as React from 'react';
import { FunctionComponent } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const optionList = [
  'ChannelName',
  'TimePosted',
];

const tableList = [
    'table name 1',
    'table name 2',
    'table name 3',
    'table name 4',
  ];

function getStyles(name: string, chosenOptions: readonly string[], theme: Theme) {
  return {
    fontWeight:
      chosenOptions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface AttributeProps {
    chosenOptions: string[],
    setChosenOptions: (value: string[]) => void
}

export const AttriuteContent: FunctionComponent<AttributeProps> = (props) => {
  const theme = useTheme();
//   const [chosenOptions, setChosenOptions] = React.useState<string[]>([]);
    const { chosenOptions, setChosenOptions, } = props;
  const handleChange = (event: SelectChangeEvent<typeof chosenOptions>) => {
    const {
      target: { value },
    } = event;
    setChosenOptions(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="attribute-multiple-chip-label">Attribute</InputLabel>
        <Select
          labelId="attribute-multiple-chip-label"
          id="attribute-multiple-chip"
          multiple
          value={chosenOptions}
          onChange={handleChange}
          input={<OutlinedInput id="attribute-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {optionList.map((option) => (
            <MenuItem
              key={option}
              value={option}
            //   style={getStyles(name, chosenOptions, theme)}
                style={getStyles(option, chosenOptions, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

interface TableProps {
    chosenTableOptions: string[],
    setChosenTableOptions: (value: string[]) => void
}

export const TableContent: FunctionComponent<TableProps> = (props) => {
    const theme = useTheme();
    // const [chosenOptions, setChosenOptions] = React.useState<string[]>([]);
    const { chosenTableOptions, setChosenTableOptions, } = props;
    const handleChange = (event: SelectChangeEvent<typeof chosenTableOptions>) => {
      const {
        target: { value },
      } = event;
      setChosenTableOptions(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="table-multiple-chip-label">chip label</InputLabel>
          <Select
            labelId="table-multiple-chip-label"
            id="table-multiple-chip"
            multiple
            value={chosenTableOptions}
            onChange={handleChange}
            input={<OutlinedInput id="table-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tableList.map((option) => (
              <MenuItem
                key={option}
                value={option}
              //   style={getStyles(name, chosenOptions, theme)}
                  style={getStyles(option, chosenTableOptions, theme)}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }