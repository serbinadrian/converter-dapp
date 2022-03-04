import { Box, Typography, Divider } from '@mui/material';
import propTypes from 'prop-types';
import ConversionCharges from '../sent-conversion-charges';

const TokenAndAmount = ({ token, amount, symbol }) => {
  return (
    <Box textAlign="center">
      <Typography variant="caption">{token}</Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="h3" marginRight={1}>
          {amount}
        </Typography>
        <Typography variant="h3">{symbol}</Typography>
      </Box>
    </Box>
  );
};

const AdaToEthTokenAndValue = ({ fromTokenAmount, fromTokenSymbol, toTokenAmount, toTokenSymbol, conversionFee, conversionFeeTokenSymbol }) => {
  return (
    <>
      <Box paddingX={4} display="flex" justifyContent="space-between" alignItems="center">
        <TokenAndAmount token="CARDANO" amount={fromTokenAmount} symbol={fromTokenSymbol} />
        <Typography>to</Typography>
        <TokenAndAmount token="ETHEREUM" amount={toTokenAmount} symbol={toTokenSymbol} />
      </Box>
      <Divider sx={{ paddingBottom: 2 }} />
      <ConversionCharges conversionFee={conversionFee} conversionSymbol={conversionFeeTokenSymbol} />
    </>
  );
};

TokenAndAmount.propTypes = {
  token: propTypes.string.isRequired,
  amount: propTypes.string.isRequired,
  symbol: propTypes.string.isRequired
};

AdaToEthTokenAndValue.propTypes = {
  fromTokenAmount: propTypes.string.isRequired,
  fromTokenSymbol: propTypes.string.isRequired,
  toTokenAmount: propTypes.string.isRequired,
  toTokenSymbol: propTypes.string.isRequired,
  conversionFee: propTypes.string.isRequired,
  conversionFeeTokenSymbol: propTypes.string.isRequired
};

export default AdaToEthTokenAndValue;
