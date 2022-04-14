import Alert from '@mui/material/Alert';
import propTypes from 'prop-types';
import { useMemo } from 'react';
import { useStyles } from './styles';

const SnetAlert = ({ error, type }) => {
  const classes = useStyles();

  const className = useMemo(() => {
    switch (type) {
      case 'success':
        return classes.successMsg;
      case 'info':
        return classes.pandingMsg;
      case 'error':
        return classes.errorMsg;
      default:
        break;
    }
  });
  return (
    <Alert icon={false} severity={type} variant="outlined" className={className}>
      {error}
    </Alert>
  );
};

SnetAlert.propTypes = {
  error: propTypes.string.isRequired,
  type: propTypes.string.isRequired
};

export default SnetAlert;
