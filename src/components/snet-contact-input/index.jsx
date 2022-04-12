import { MenuItem, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

const SnetContactInput = ({ id, value, onChange, label, select, multiline, options, helperText, error }) => {
  const classes = useStyles();
  return (
    <Stack marginBottom={3} width="100%">
      <TextField
        id={id}
        fullWidth
        value={value}
        onChange={onChange}
        label={label}
        select={select}
        multiline={multiline}
        rows={multiline ? 5 : 1}
        InputProps={{
          className: classes.field,
          style: { height: multiline ? 168 : 56 }
        }}
        InputLabelProps={{ className: classes.field }}
        helperText={helperText}
        error={error}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} style={{ fontSize: 16 }}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

SnetContactInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  select: PropTypes.bool,
  multiline: PropTypes.bool,
  options: PropTypes.array,
  helperText: PropTypes.string,
  error: PropTypes.bool
};

SnetContactInput.defaultProps = {
  select: false,
  multiline: false,
  value: '',
  options: [],
  helperText: '',
  error: false
};
export default SnetContactInput;
