import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import propTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { styles, MenuProps } from './styles';

const BlockchainDropdown = ({ curvedBorders, size, tokens }) => {
  const [tokenName, setTokenName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setTokenName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={styles.formControl}>
      <Select
        size={size}
        displayEmpty
        value={tokenName}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          return (
            <div>
              {selected.image}
              <img width="40" src={selected.image} alt={selected.name} />
              {selected}
            </div>
          );
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'blockchain-dropown' }}
        sx={curvedBorders ? styles.dropdownWithBorders : styles.dropdown}
      >
        {tokens.map((token) => (
          <MenuItem key={token.name} value={token.name}>
            <ListItemAvatar>
              <Avatar sx={styles.avatar} alt={token.name} src={token.logo} />
            </ListItemAvatar>
            <ListItemText>{token.name}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

BlockchainDropdown.propTypes = {
  curvedBorders: propTypes.bool,
  size: propTypes.string,
  tokens: propTypes.arrayOf(propTypes.object)
};

BlockchainDropdown.defaultProps = {
  curvedBorders: true,
  size: 'small',
  tokens: []
};

export default BlockchainDropdown;
