import { Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SnetButton from '../snet-button';
import AdaToEthTokenAndValue from './AdaToEthTokenAndValue';

const ClaimTokens = ({ onClickClaim, onClickContinueLater }) => {
  const { conversion } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);

  return (
    <>
      <Typography variant="h6" marginY={6}>
        Tokens Conversion process is successfully competed. Now user can interact with Metamask and claim the amount.
      </Typography>
      <AdaToEthTokenAndValue
        fromTokenAmount={conversion.depositAmount}
        fromTokenSymbol={conversion.pair.from_token.symbol}
        toTokenAmount={conversion.receivingAmount}
        toTokenSymbol={conversion.pair.to_token.symbol}
        conversionFee={conversion.conversionFees}
        conversionFeeTokenSymbol={conversion.pair.from_token.symbol}
      />
      <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
        <SnetButton name="Continue Later" variant="outlined" onClick={onClickContinueLater} />
        <SnetButton name="Claim" onClick={onClickClaim} />
      </Stack>
    </>
  );
};

ClaimTokens.propTypes = {
  onClickClaim: propTypes.func.isRequired,
  onClickContinueLater: propTypes.func.isRequired
};

export default ClaimTokens;
