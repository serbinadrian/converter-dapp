import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import propTypes from 'prop-types';
import BlockchainDropdown from './BlockchainDropdown';
import { styles } from './styles';

const InputWithAssetDropdown = ({ tokenPairs, value, handleSelect, inputValue, onInputChange }) => {
  return (
    <TextField
      fullWidth
      value={inputValue}
      onChange={onInputChange}
      size="small"
      InputProps={{
        endAdornment: (
          <Box sx={styles.texfieldWithDropdown}>
            <BlockchainDropdown handleSelect={handleSelect} value={value} size="medium" curvedBorders={false} tokens={tokenPairs} />
          </Box>
        )
      }}
    />
  );
};

InputWithAssetDropdown.propTypes = {
  tokenPairs: propTypes.arrayOf(propTypes.object),
  value: propTypes.objectOf(propTypes.object),
  handleSelect: propTypes.func.isRequired,
  inputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  onInputChange: propTypes.func
};

InputWithAssetDropdown.defaultProps = {
  tokenPairs: [],
  value: { id: '' }
};

export default InputWithAssetDropdown;
