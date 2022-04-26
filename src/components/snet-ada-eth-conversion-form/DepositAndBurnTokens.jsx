import { Typography, Box, Stack, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector, useDispatch } from 'react-redux';
import SnetButton from '../snet-button';
import SnetInputWithCopy from '../snet-input-with-copy/SnetInputWithCopy';
import AdaToEthTokenAndValue from './AdaToEthTokenAndValue';
import { conversionStatuses, conversionSteps } from '../../utils/ConverterConstants';
import { setActiveStep } from '../../services/redux/slices/tokenPairs/tokenPairSlice';
import SnetAlert from '../snet-alert';
import Paths from '../../router/paths';

const DepositAndBurnTokens = ({ onClickCancel }) => {
  const navigate = useNavigate();
  const { conversion, activeStep } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);

  const isDepositReceived = conversion.status === conversionStatuses.WAITING_FOR_CLAIM;
  const isWaitingForDeposit = activeStep === conversionSteps.DEPOSIT_TOKENS;

  const dispatch = useDispatch();

  const onClickContinue = () => {
    if (isWaitingForDeposit) {
      dispatch(setActiveStep(conversionSteps.BURN_TOKENS));
    } else if (isDepositReceived) {
      dispatch(setActiveStep(conversionSteps.CLAIM_TOKENS));
    }
  };

  const openLink = () => {
    navigate(Paths.Transactions);
  };

  return (
    <>
      <Typography variant="h6" marginY={6}>
        Please deposit tokens to the Cardano address displayed below. This would incur transaction charges on the cardano chain.
      </Typography>
      <Box>
        <AdaToEthTokenAndValue
          fromTokenAmount={conversion.depositAmount}
          fromTokenSymbol={conversion.pair.from_token.symbol}
          toTokenAmount={conversion.receivingAmount}
          toTokenSymbol={conversion.pair.to_token.symbol}
          conversionFee={conversion.conversionFees}
          conversionFeeTokenSymbol={conversion.pair.from_token.symbol}
        />
        {conversion.status !== conversionStatuses.EXPIRED ? (
          <>
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
              <SnetButton name="Close" variant="outlined" onClick={onClickCancel} />
              <SnetButton disabled={!isWaitingForDeposit && !isDepositReceived} name="Continue" onClick={onClickContinue} />
            </Stack>
          </>
        ) : (
          <Box marginTop={2}>
            <SnetAlert
              iconPresence={false}
              type="error"
              error={<p>A more recent deposit was received or this transaction was expired. Please check transaction history for more details.</p>}
            />
            <Box width={420} marginTop={32} margin="0 auto" justifyContent="space-between">
              <SnetButton name="close" onClick={onClickCancel} variant="outlined" />
              <SnetButton name="view transaction history" onClick={openLink} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

DepositAndBurnTokens.propTypes = {
  onClickCancel: propTypes.func.isRequired
};

export default DepositAndBurnTokens;
