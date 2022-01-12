import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const SnetButton = ({ name, onClick }) => {
  return (
    <Button onClick={onClick} variant="contained" color="primary">
      {name}
    </Button>
  );
};

SnetButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
};

export default SnetButton;
