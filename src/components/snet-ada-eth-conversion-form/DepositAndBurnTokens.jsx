import { useState } from 'react';
import { Typography, FormControl, InputLabel, OutlinedInput, Box, Stack, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector, useDispatch } from 'react-redux';
import SnetButton from '../snet-button';
import AdaToEthTokenAndValue from './AdaToEthTokenAndValue';
import { conversionStatuses, conversionSteps } from '../../utils/ConverterConstants';
import { setActiveStep } from '../../services/redux/slices/tokenPairs/tokenPairSlice';
import { useStyles } from './styles';

const DepositAndBurnTokens = ({ onClickCancel, onClickContinueLater }) => {
  const classes = useStyles();
  const { conversion, activeStep } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);
  const [buttonName, setButtonName] = useState('Copy');

  const isDepositReceived = conversion.status === conversionStatuses.WAITING_FOR_CLAIM;
  const isWaitingForDeposit = activeStep === conversionSteps.DEPOSIT_TOKENS;

  const dispatch = useDispatch();

  const onClickContinue = () => {
    if (isWaitingForDeposit) {
      dispatch(setActiveStep(conversionSteps.CONVERT_TOKENS));
    } else if (isDepositReceived) {
      dispatch(setActiveStep(conversionSteps.CLAIM_TOKENS));
    }
  };

  const onClickConvertToken = () => {
    dispatch(setActiveStep(conversionSteps.CONVERT_TOKENS));
  };

  const onCopy = () => {
    navigator.clipboard.writeText(conversion.depositAddress);
    setButtonName('Copied');
    setTimeout(() => {
      setButtonName('Copy');
    }, 4000);
  };

  return (
    <>
      {activeStep === 0 ? (
        <Typography variant="h6" marginY={4}>
          Please deposit tokens to the Cardano address displayed below. This would incur transaction charges on the cardano chain.
        </Typography>
      ) : (
        <Typography variant="h6" marginY={4}>
          Once the deposit is received, click convert tokens to initiate token burn process and the amount will be converted to the ethereum chain.
        </Typography>
      )}
      <Box>
        <AdaToEthTokenAndValue
          fromTokenAmount={conversion.depositAmount}
          fromTokenSymbol={conversion.pair.from_token.symbol}
          toTokenAmount={conversion.receivingAmount}
          toTokenSymbol={conversion.pair.to_token.symbol}
          conversionFee={conversion.conversionFees}
          conversionFeeTokenSymbol={conversion.pair.from_token.symbol}
        />
        {activeStep === 0 ? (
          <Box className={classes.inputBoxAndCopyBtnContainer}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Cardano Deposit Address</InputLabel>
              <OutlinedInput id="snet-input-with-copy" fullWidth type="text" value={conversion.depositAddress} label="Cardano Deposit Address" disabled />
            </FormControl>
            <SnetButton name={buttonName} onClick={onCopy} />
          </Box>
        ) : null}
        {!isWaitingForDeposit ? (
          <Stack direction="column" alignItems="center" marginBottom={6} spacing={2} justifyContent="center">
            {isDepositReceived ? <CheckCircleOutlineIcon color="success" fontSize="large" /> : <CircularProgress />}
            <Typography variant="h3" color="lightgrey">
              {isDepositReceived ? 'Deposit received successfully' : 'Waiting for the deposit to arrive'}
            </Typography>
          </Stack>
        ) : null}
        <Box className={classes.btnContainer}>
          {activeStep === 0 ? (
            <>
              <SnetButton name="cancel" variant="outlined" onClick={onClickCancel} />
              <SnetButton disabled={!isWaitingForDeposit && !isDepositReceived} name="i have transferred & ready to continue" onClick={onClickContinue} />
            </>
          ) : (
            <>
              <SnetButton name="continue later" variant="outlined" onClick={onClickContinueLater} />
              <SnetButton disabled={!isWaitingForDeposit && !isDepositReceived} name="convert tokens" onClick={onClickConvertToken} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

DepositAndBurnTokens.propTypes = {
  onClickCancel: propTypes.func.isRequired,
  onClickContinueLater: propTypes.func.isRequired
};

export default DepositAndBurnTokens;
