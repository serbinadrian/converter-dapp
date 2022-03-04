import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, FormControl, InputAdornment, InputLabel } from '@mui/material';
import propTypes from 'prop-types';

const SnetInputWithCopy = ({ value, label }) => {
  const [buttonName, setButtonName] = useState('Copy');

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setButtonName('Copied');
    setTimeout(() => {
      setButtonName('Copy');
    }, 4000);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="snet-input-with-copy"
        fullWidth
        type="text"
        value={value}
        label={label}
        disabled
        endAdornment={
          <InputAdornment position="end">
            <Button onClick={onCopy}>{buttonName}</Button>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

SnetInputWithCopy.propTypes = {
  value: propTypes.string.isRequired,
  label: propTypes.string.isRequired
};

export default SnetInputWithCopy;
