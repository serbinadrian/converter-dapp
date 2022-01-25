import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const SnetButton = ({ name, onClick, variant }) => {
  return (
    <Button onClick={onClick} variant={variant} color="primary">
      {name}
    </Button>
  );
};

SnetButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string
};

SnetButton.defaultProps = {
  variant: 'contained'
};

export default SnetButton;
