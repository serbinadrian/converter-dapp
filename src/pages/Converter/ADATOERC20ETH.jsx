import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import SnetAdaEthSteps from '../../components/snet-ada-eth-conversion-form/SnetAdaEthSteps';
import SnetAdaEthTitle from '../../components/snet-ada-eth-conversion-form/SnetAdaEthTitle';
import SnetPaper from '../../components/snet-paper';
import styles from './styles';
import DepositAndBurnTokens from '../../components/snet-ada-eth-conversion-form/DepositAndBurnTokens';
import { setActiveStep, setConversionDirection, setConversionStatus } from '../../services/redux/slices/tokenPairs/tokenPairSlice';
import { setBlockchainStatus } from '../../services/redux/slices/blockchain/blockchainSlice';
import ClaimTokens from '../../components/snet-ada-eth-conversion-form/ClaimTokens';
import TransactionReceipt from '../../components/snet-ada-eth-conversion-form/TransactionReceipt';
import { availableBlockchains, conversionSteps, blockchainStatusLabels } from '../../utils/ConverterConstants';
import { conversionClaim, getConversionStatus, updateTransactionStatus } from '../../utils/HttpRequests';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import SnetLoader from '../../components/snet-loader';
import Paths from '../../router/paths';
import SnetSnackbar from '../../components/snet-snackbar';

const ADATOERC20ETH = () => {
  const { generateSignatureForClaim, conversionIn } = useWalletHook();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: '' });
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionReceipt, setTransactionReceipt] = useState([]);
  const { conversionStepsForAdaToEth, activeStep, conversion } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);
  const { conversionApiCallIntervalIds } = useSelector((state) => state.tokenPairs);
  const { blockchainStatus } = useSelector((state) => state.blockchains);

  console.log('conversionStepsForAdaToEth', conversionStepsForAdaToEth);
  console.log('activeStep', activeStep);
  console.log('##conversion#', conversion);

  const { fromAddress, toAddress } = useSelector((state) => state.wallet);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setConversionDirection(availableBlockchains.ETHEREUM));
    dispatch(setActiveStep(conversionSteps.DEPOSIT_TOKENS));
  };

  const checkConversionStatus = () => {
    const sixtySeconds = 60000;
    const intervalId = setInterval(async () => {
      try {
        if (activeStep === conversionSteps.BURN_TOKENS) {
          const response = await getConversionStatus(conversion.conversionId);
          dispatch(setConversionStatus(response.conversion.status));
        }
      } catch (error) {
        console.log(error);
      }
    }, sixtySeconds);

    return () => {
      clearInterval(intervalId);
    };
  };

  const claimTheTokens = async (contractAddress, conversionId, amount, signature, decimals) => {
    try {
      return await conversionIn(contractAddress, amount, conversionId, signature, decimals);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const generateReceipt = (depositAmount, claimAmount, txnFee, fromTokenSymbol, toTokenSymbol) => {
    return [
      { label: 'Tokens Deposited ', value: `${depositAmount} ${fromTokenSymbol}` },
      { label: 'Tokens Converted ', value: `${claimAmount} ${toTokenSymbol}` },
      { label: 'Transaction Charges ', value: `${txnFee} ${toTokenSymbol}` },
      { label: 'Total tokens received ', value: `${claimAmount} ${toTokenSymbol}` }
    ];
  };

  const getSignatureForClaim = async () => {
    try {
      setLoading(true);
      dispatch(setBlockchainStatus(blockchainStatusLabels.ON_SIGNING_FROM_WALLET));
      const amount = conversion.depositAmount;
      const { conversionId } = conversion;
      const decimals = conversion.pair.from_token.allowed_decimal;
      const signature = await generateSignatureForClaim(conversionId, amount, fromAddress, toAddress);
      const response = await conversionClaim(conversionId, amount, signature, toAddress, fromAddress);

      dispatch(setBlockchainStatus(blockchainStatusLabels.ON_CONFIRMING_TXN));
      const contractAddress = response.contract_address;
      const txnHash = await claimTheTokens(contractAddress, conversionId, response.claim_amount, response.signature, decimals);
      setTransactionHash(txnHash);

      dispatch(setBlockchainStatus(blockchainStatusLabels.ON_UPDATING_TXN_STATUS));
      await updateTransactionStatus(conversionId, txnHash);

      const receipt = generateReceipt(
        conversion.depositAmount,
        conversion.receivingAmount,
        conversion.conversionFees,
        conversion.pair.from_token.symbol,
        conversion.pair.to_token.symbol
      );
      setTransactionReceipt(receipt);
      dispatch(setActiveStep(conversionSteps.SUMMARY));
    } catch (error) {
      const message = error.message || JSON.stringify(error);
      setError({ isError: true, message });
    } finally {
      setLoading(false);
    }
  };

  const continueLater = () => {
    handleCancel();
    navigate(Paths.Transactions);
  };

  const formatConversionTitle = () => {
    const { pair } = conversion;
    const from = `${pair.from_token.symbol} (on ${pair.from_token.blockchain.name})`;
    const to = `${pair.to_token.symbol} (on ${pair.to_token.blockchain.name})`;
    return `Converting ${from} to ${to}`;
  };

  useEffect(() => {
    if (activeStep === conversionSteps.BURN_TOKENS) {
      checkConversionStatus();
    }
  }, [activeStep]);

  return (
    <SnetPaper>
      <SnetSnackbar open={error.isError} message={error.message} onClose={() => {}} />
      {blockchainStatus ? (
        <SnetLoader dialogBody={blockchainStatus.message} onDialogClose={() => {}} isDialogOpen={isLoading} dialogTitle={blockchainStatus.title} />
      ) : null}
      <SnetAdaEthTitle title={formatConversionTitle()} />
      <Box sx={styles.padding}>
        <SnetAdaEthSteps activeStep={activeStep} steps={conversionStepsForAdaToEth} />
        {activeStep === conversionSteps.DEPOSIT_TOKENS || activeStep === conversionSteps.BURN_TOKENS ? (
          <DepositAndBurnTokens onClickCancel={handleCancel} />
        ) : null}
        {activeStep === conversionSteps.CLAIM_TOKENS ? <ClaimTokens onClickContinueLater={continueLater} onClickClaim={getSignatureForClaim} /> : null}
        {activeStep === conversionSteps.SUMMARY ? <TransactionReceipt txnHash={transactionHash} receiptLines={transactionReceipt} /> : null}
      </Box>
    </SnetPaper>
  );
};

export default ADATOERC20ETH;
