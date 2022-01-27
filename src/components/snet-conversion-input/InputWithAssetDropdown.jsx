import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import BlockchainDropdown from './BlockchainDropdown';
import { styles } from './styles';

const InputWithAssetDropdown = () => {
  return (
    <TextField
      fullWidth
      size="small"
      InputProps={{
        endAdornment: (
          <Box sx={styles.texfieldWithDropdown}>
            <BlockchainDropdown curvedBorders={false} />
          </Box>
        )
      }}
    />
  );
};

export default InputWithAssetDropdown;
