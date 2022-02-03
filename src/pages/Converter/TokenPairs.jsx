import Fab from '@mui/material/Fab';
import propTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import SwapIcon from '@mui/icons-material/SwapVert';
import SnetConversionOptions from '../../components/snet-conversion-input';

const TokenPairs = ({ fromBlockchains, toBlockchains }) => {
  return (
    <>
      <SnetConversionOptions blockchains={fromBlockchains} direction="FROM" />
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <Fab aria-label="swap-icon" color="primary">
          <SwapIcon />
        </Fab>
      </Stack>
      <SnetConversionOptions blockchains={toBlockchains} direction="TO" />
    </>
  );
};

TokenPairs.propTypes = {
  fromBlockchains: propTypes.arrayOf(propTypes.object).isRequired,
  toBlockchains: propTypes.arrayOf(propTypes.object).isRequired
};

export default TokenPairs;
