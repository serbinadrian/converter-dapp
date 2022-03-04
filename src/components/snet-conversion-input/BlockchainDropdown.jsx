import OutlinedInput from '@mui/material/OutlinedInput';
import { Typography } from '@mui/material';
import propTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { styles, MenuProps } from './styles';

const BlockchainDropdown = ({ curvedBorders, size, tokens, value, handleSelect, id }) => {
  return (
    <FormControl sx={styles.formControl}>
      <Select
        id={id}
        size={size}
        onChange={handleSelect}
        input={<OutlinedInput />}
        value={value}
        renderValue={(selected) => {
          return <Typography variant="body2">{selected.name || selected.symbol}</Typography>;
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'blockchain-dropown' }}
        sx={curvedBorders ? styles.dropdownWithBorders : styles.dropdown}
      >
        {tokens.map((token) => (
          <MenuItem key={token.id} value={token}>
            <ListItemAvatar>
              <Avatar sx={styles.avatar} alt={token.name} src={token.logo} />
            </ListItemAvatar>
            <ListItemText>{token.name || token.symbol}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

BlockchainDropdown.propTypes = {
  id: propTypes.string.isRequired,
  curvedBorders: propTypes.bool,
  size: propTypes.string,
  value: propTypes.any,
  tokens: propTypes.arrayOf(propTypes.object),
  handleSelect: propTypes.func.isRequired
};

BlockchainDropdown.defaultProps = {
  curvedBorders: true,
  size: 'small',
  tokens: [],
  value: { id: '' }
};

export default BlockchainDropdown;
