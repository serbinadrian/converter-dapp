import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import propTypes from 'prop-types';

const SnetSnackbar = ({ open, onClose, key, message }) => {
  return <Snackbar open={open} onClose={onClose} TransitionComponent={<Slide direction="up" />} message={message} key={key} />;
};

SnetSnackbar.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  key: propTypes.string.isRequired,
  message: propTypes.string.isRequired
};

export default SnetSnackbar;
