import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import propTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { styles, MenuProps } from './styles';

const names = ['Ethereum'];

const BlockchainDropdown = ({ curvedBorders }) => {
  const [blockchainName, setblockchainName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setblockchainName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={styles.formControl}>
      <Select
        displayEmpty
        value={blockchainName}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => selected}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'blockchain-dropown' }}
        sx={curvedBorders ? styles.dropdownWithBorders : styles.dropdown}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <ListItemAvatar>
              <img width="40" src="https://logos-world.net/wp-content/uploads/2020/12/Ethereum-Symbol.png" alt={name} />
            </ListItemAvatar>
            <ListItemText>{name}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

BlockchainDropdown.propTypes = {
  curvedBorders: propTypes.bool
};

BlockchainDropdown.defaultProps = {
  curvedBorders: true
};

export default BlockchainDropdown;
