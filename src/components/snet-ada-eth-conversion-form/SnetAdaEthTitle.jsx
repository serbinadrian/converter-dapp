import { Divider, Typography } from '@mui/material';
import propTypes from 'prop-types';

const SnetAdaEthTitle = ({ title }) => {
  return (
    <>
      <Typography>{title}</Typography>
      <Divider light sx={{ marginBottom: 2, marginTop: 2 }} />
    </>
  );
};

SnetAdaEthTitle.propTypes = {
  title: propTypes.string.isRequired
};

export default SnetAdaEthTitle;
