import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import propTypes from 'prop-types';

const WalletAddressInput = ({ blockchain, onCancel, onSaveAddress }) => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <>
      <TextField
        onChange={handleAddressChange}
        value={address}
        name={`${blockchain}-address`}
        label={`${blockchain} address`}
        color="primary"
        fullWidth
        focused
      />
      <Stack spacing={1} marginTop={2} direction="row">
        <Button onClick={onCancel} variant="text" size="small">
          Cancel
        </Button>
        <Button onClick={() => onSaveAddress(address)} variant="text" size="small">
          Save
        </Button>
      </Stack>
    </>
  );
};

WalletAddressInput.propTypes = {
  blockchain: propTypes.string.isRequired,
  onCancel: propTypes.func.isRequired,
  onSaveAddress: propTypes.func.isRequired
};

export default WalletAddressInput;
