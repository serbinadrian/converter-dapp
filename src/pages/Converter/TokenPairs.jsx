import Fab from '@mui/material/Fab';
import propTypes from 'prop-types';
import { Typography, Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import SwapIcon from '@mui/icons-material/SwapVert';
import SnetConversionOptions from '../../components/snet-conversion-input';

const TokenPairs = ({
  showFetchAmountFromWallet,
  onSwapPairs,
  fromBlockchains,
  toBlockchains,
  toInputChange,
  toInputValue,
  fromInputChange,
  fromInputValue,
  onSelectingFromToken,
  onSelectingToToken
}) => {
  return (
    <>
      <SnetConversionOptions
        handleSelectToken={onSelectingFromToken}
        blockchains={fromBlockchains}
        onInputChange={fromInputChange}
        inputValue={fromInputValue}
        direction="FROM"
      />
      {showFetchAmountFromWallet ? (
        <Box display="flex" alignItems="center" marginTop={1}>
          <Typography fontSize="12px">Balance: 40 AGIX</Typography>
          <Button sx={{ fontSize: '12px', marginLeft: '12px' }} size="small" variant="text">
            USE FULL AMOUNT
          </Button>
        </Box>
      ) : null}
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <Fab onClick={onSwapPairs} aria-label="swap-icon" color="primary">
          <SwapIcon />
        </Fab>
      </Stack>
      <SnetConversionOptions
        handleSelectToken={onSelectingToToken}
        readOnly
        blockchains={toBlockchains}
        onInputChange={toInputChange}
        inputValue={toInputValue}
        direction="TO"
      />
    </>
  );
};

TokenPairs.propTypes = {
  fromBlockchains: propTypes.arrayOf(propTypes.object).isRequired,
  toBlockchains: propTypes.arrayOf(propTypes.object).isRequired,
  toInputChange: propTypes.func.isRequired,
  toInputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  fromInputChange: propTypes.func.isRequired,
  fromInputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  onSwapPairs: propTypes.func.isRequired,
  showFetchAmountFromWallet: propTypes.bool.isRequired,
  onSelectingToToken: propTypes.func.isRequired,
  onSelectingFromToken: propTypes.func.isRequired
};

export default TokenPairs;
