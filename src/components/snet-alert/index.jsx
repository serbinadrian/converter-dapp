import Alert from '@mui/material/Alert';
import propTypes from 'prop-types';
import { useStyles } from './styles';

const SnetAlert = ({ error }) => {
  const classes = useStyles();
  return (
    <Alert className={classes.alertBox} severity="error">
      {error}
    </Alert>
  );
};

SnetAlert.propTypes = {
  error: propTypes.string.isRequired
};

export default SnetAlert;
