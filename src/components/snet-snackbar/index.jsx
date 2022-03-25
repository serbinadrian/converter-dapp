import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import propTypes from 'prop-types';
import { Button } from '@mui/material';
import { isNil } from 'lodash';

const SnetSnackbar = ({ open, onClose, message, redirectTo }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  const formatMessage = () => {
    return isNil(message) ? '' : message.message || JSON.stringify(message);
  };

  return (
    <Snackbar
      action={
        redirectTo ? (
          <Button color="warning" size="small" onClick={handleRedirect}>
            View
          </Button>
        ) : null
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={formatMessage()}
    />
  );
};

SnetSnackbar.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func.isRequired,
  message: propTypes.oneOfType([propTypes.string, propTypes.object]),
  redirectTo: propTypes.string
};

SnetSnackbar.defaultProps = {
  open: false,
  message: { message: '', redirectTo: '' },
  redirectTo: null
};

export default SnetSnackbar;
