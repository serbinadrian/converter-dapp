import { useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import propTypes from 'prop-types';
import BlockchainDropdown from './BlockchainDropdown';
import { styles } from './styles';

const InputWithAssetDropdown = ({ tokenPairs, value, handleSelect, inputValue, onInputChange, readOnly, id }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [tokenPairs]);

  return (
    <TextField
      inputRef={inputRef}
      id={id}
      disabled={readOnly}
      fullWidth
      type="number"
      value={inputValue}
      onChange={onInputChange}
      size="small"
      InputProps={{
        endAdornment: (
          <Box sx={styles.texfieldWithDropdown}>
            <BlockchainDropdown
              handleSelect={handleSelect}
              value={value}
              size="medium"
              curvedBorders={false}
              tokens={tokenPairs}
              id={`conversion-token-${id}`}
            />
          </Box>
        )
      }}
    />
  );
};

InputWithAssetDropdown.propTypes = {
  id: propTypes.string.isRequired,
  tokenPairs: propTypes.arrayOf(propTypes.object),
  value: propTypes.any,
  handleSelect: propTypes.func.isRequired,
  inputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  onInputChange: propTypes.func,
  readOnly: propTypes.bool.isRequired
};

InputWithAssetDropdown.defaultProps = {
  tokenPairs: [],
  value: { id: '' }
};

export default InputWithAssetDropdown;
