import { Typography } from '@mui/material';
import propTypes from 'prop-types';

const SnetAdaEthTitle = ({ title }) => {
  return <Typography>{title}</Typography>;
};

SnetAdaEthTitle.propTypes = {
  title: propTypes.string.isRequired
};

export default SnetAdaEthTitle;
