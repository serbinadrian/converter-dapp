import { Typography, Box, Stack, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector, useDispatch } from 'react-redux';
import SnetButton from '../snet-button';
import SnetInputWithCopy from '../snet-input-with-copy/SnetInputWithCopy';
import AdaToEthTokenAndValue from './AdaToEthTokenAndValue';
import { conversionStatuses, conversionSteps } from '../../utils/ConverterConstants';
import { setActiveStep } from '../../services/redux/slices/tokenPairs/tokenPairSlice';

const DepositAndBurnTokens = ({ onClickCancel }) => {
  const { conversion, activeStep } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);

  const { conversionPair } = conversion;

  const isDepositReceived = conversion.status === conversionStatuses.COMPLETE;
  const isWaitingForDeposit = activeStep === conversionSteps.DEPOSIT_TOKENS;

  const dispatch = useDispatch();

  const onClickContinue = () => {
    if (isWaitingForDeposit) {
      dispatch(setActiveStep(conversionSteps.BURN_TOKENS));
    } else if (isDepositReceived) {
      dispatch(setActiveStep(conversionSteps.CLAIM_TOKENS));
    }
  };

  return (
    <>
      <Typography variant="h6" marginY={6}>
        Please deposit tokens to the Cardano address displayed below. This would incur transaction charges on the cardano chain.
      </Typography>
      <Box>
        <AdaToEthTokenAndValue
          fromTokenAmount={conversion.depositAmount}
          fromTokenSymbol={conversionPair.fromPair.symbol}
          toTokenAmount={conversion.receievingAmount}
          toTokenSymbol={conversionPair.toTokenPair.symbol}
          conversionFee={conversion.conversionCharge.amount}
          conversionFeeTokenSymbol={conversion.conversionCharge.symbol}
        />
        <Box marginY={6}>
          <SnetInputWithCopy value={conversion.depositAddress} label="Cardano Deposit Address" />
        </Box>
        {!isWaitingForDeposit ? (
          <Stack direction="column" alignItems="center" marginBottom={6} spacing={2} justifyContent="center">
            {isDepositReceived ? <CheckCircleOutlineIcon color="success" fontSize="large" /> : <CircularProgress />}
            <Typography variant="h3" color="lightgrey">
              {isDepositReceived ? 'Deposit received successfully' : 'Waiting for the deposit to arrive'}
            </Typography>
          </Stack>
        ) : null}
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
          <SnetButton name="Cancel" variant="outlined" onClick={onClickCancel} />
          <SnetButton disabled={!isWaitingForDeposit && !isDepositReceived} name="Continue" onClick={onClickContinue} />
        </Stack>
      </Box>
    </>
  );
};

DepositAndBurnTokens.propTypes = {
  onClickCancel: propTypes.func.isRequired
};

export default DepositAndBurnTokens;
