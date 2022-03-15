import Alert from '@mui/material/Alert';
import propTypes from 'prop-types';

const SnetAlert = ({ error }) => {
  return <Alert severity="error">{error}</Alert>;
};

SnetAlert.propTypes = {
  error: propTypes.string.isRequired
};

export default SnetAlert;
