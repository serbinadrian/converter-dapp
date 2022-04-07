import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

const SnetContactInput = ({ id, value, onChange, label, select, multiline, options, helperText, error }) => {
  const classes = useStyles();
  return (
    <div className={classes.fieldContainer}>
      <TextField
        id={id}
        fullWidth
        value={value}
        onChange={onChange}
        size="small"
        label={label}
        select={select}
        multiline={multiline}
        rows={multiline ? 5 : 1}
        InputProps={{
          className: classes.field,
          style: { fontSize: 16 }
        }}
        InputLabelProps={{ style: { fontSize: 16 } }}
        helperText={helperText}
        error={error}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} style={{ fontSize: 16 }}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
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
