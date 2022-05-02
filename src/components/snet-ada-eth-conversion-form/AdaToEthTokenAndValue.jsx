import { Box, Typography, Divider } from '@mui/material';
import propTypes from 'prop-types';
import ConversionCharges from '../sent-conversion-charges';
import { useStyles } from './styles';

const TokenAndAmount = ({ token, amount, symbol }) => {
  const classes = useStyles();
  return (
    <Box className={classes.tokenAndAmtContainer}>
      <Typography>{token}</Typography>
      <Box>
        <span>{amount}</span>
        <span>{symbol}</span>
      </Box>
    </Box>
  );
};

const AdaToEthTokenAndValue = ({ fromTokenAmount, fromTokenSymbol, toTokenAmount, toTokenSymbol, conversionFee, conversionFeeTokenSymbol }) => {
  const classes = useStyles();
  return (
    <Box className={classes.adaEthTokenAndValueContainer}>
      <Box className={classes.amtSymbolAndValueContainer}>
        <TokenAndAmount token="CARDANO" amount={fromTokenAmount} symbol={fromTokenSymbol} />
        <Typography>to</Typography>
        <TokenAndAmount token="ETHEREUM" amount={toTokenAmount} symbol={toTokenSymbol} />
      </Box>
      <Divider />
      <ConversionCharges conversionFee={conversionFee} conversionSymbol={conversionFeeTokenSymbol} />
    </Box>
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
