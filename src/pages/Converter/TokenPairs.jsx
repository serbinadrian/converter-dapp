import Fab from '@mui/material/Fab';
import propTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import SwapIcon from '@mui/icons-material/SwapVert';
import SnetConversionOptions from '../../components/snet-conversion-input';

const TokenPairs = ({ fromTokenPairs, toTokenPairs, blockchains }) => {
  return (
    <>
      <SnetConversionOptions blockchains={blockchains} tokens={fromTokenPairs} direction="FROM" />
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <Fab aria-label="swap-icon" color="primary">
          <SwapIcon />
        </Fab>
      </Stack>
      <SnetConversionOptions blockchains={blockchains} tokens={toTokenPairs} direction="TO" />
    </>
  );
};

TokenPairs.propTypes = {
  fromTokenPairs: propTypes.arrayOf(propTypes.object).isRequired,
  toTokenPairs: propTypes.arrayOf(propTypes.object).isRequired,
  blockchains: propTypes.arrayOf(propTypes.object).isRequired
};

export default TokenPairs;
