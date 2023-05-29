import * as React from 'react';
// import ListItemText from '@mui/material/ListItemText';

import FormControl from "@material-ui/core/FormControlLabel";
import { MenuItem } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputLabel , Select } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import { ListItemText } from '@material-ui/core';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export default function MultipleSelectCheckmarks(personName) {
  const [personName, setPersonName] = React.useState([]);
    // console.log(personName);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      {/* <FormControl sx={{ m: 1, width: 300 }}> */}
        <InputLabel  id="demo-multiple-checkbox-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      {/* </FormControl> */}
    </div>
  );
}
