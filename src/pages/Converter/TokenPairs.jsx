import Fab from '@mui/material/Fab';
import propTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import SwapIcon from '@mui/icons-material/SwapVert';
import SnetConversionOptions from '../../components/snet-conversion-input';

const TokenPairs = ({ fromBlockchains, toBlockchains, toInputChange, toInputValue, fromInputChange, fromInputValue }) => {
  return (
    <>
      <SnetConversionOptions blockchains={fromBlockchains} onInputChange={fromInputChange} inputValue={fromInputValue} direction="FROM" />
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <Fab aria-label="swap-icon" color="primary">
          <SwapIcon />
        </Fab>
      </Stack>
      <SnetConversionOptions blockchains={toBlockchains} onInputChange={toInputChange} inputValue={toInputValue} direction="TO" />
    </>
  );
};

TokenPairs.propTypes = {
  fromBlockchains: propTypes.arrayOf(propTypes.object).isRequired,
  toBlockchains: propTypes.arrayOf(propTypes.object).isRequired,
  toInputChange: propTypes.func.isRequired,
  toInputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  fromInputChange: propTypes.func.isRequired,
  fromInputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired
};

export default TokenPairs;
