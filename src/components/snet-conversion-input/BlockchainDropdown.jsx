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

const blockchains = [
  { name: 'Ethereum', image: 'https://logos-world.net/wp-content/uploads/2020/12/Ethereum-Symbol.png' },
  { name: 'Cardano', image: 'https://c.tenor.com/4hza808FnG4AAAAC/cardano-logo.gif' }
];

const BlockchainDropdown = ({ curvedBorders, size }) => {
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
        size={size}
        displayEmpty
        value={blockchainName}
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
        {blockchains.map((blockchain) => (
          <MenuItem key={blockchain.name} value={blockchain.name}>
            <ListItemAvatar>
              <Avatar sx={styles.avatar} alt={blockchain.name} src={blockchain.image} />
            </ListItemAvatar>
            <ListItemText>{blockchain.name}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

BlockchainDropdown.propTypes = {
  curvedBorders: propTypes.bool,
  size: propTypes.string
};

BlockchainDropdown.defaultProps = {
  curvedBorders: true,
  size: 'small'
};

export default BlockchainDropdown;
