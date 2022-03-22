import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import propTypes from 'prop-types';

const SnetSnackbar = ({ open, onClose, message }) => {
  return <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={onClose} message={message} />;
};

SnetSnackbar.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func.isRequired,
  message: propTypes.string
};

SnetSnackbar.defaultProps = {
  open: false,
  message: ''
};

export default SnetSnackbar;
