import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import SnetAdaEthSteps from '../../components/snet-ada-eth-conversion-form/SnetAdaEthSteps';
import SnetAdaEthTitle from '../../components/snet-ada-eth-conversion-form/SnetAdaEthTitle';
import SnetPaper from '../../components/snet-paper';
import styles from './styles';
import DepositAndBurnTokens from '../../components/snet-ada-eth-conversion-form/DepositAndBurnTokens';
import { setActiveStep, setAdaConversionInfo, setConversionDirection } from '../../services/redux/slices/tokenPairs/tokenPairSlice';
import ClaimTokens from '../../components/snet-ada-eth-conversion-form/ClaimTokens';
import TransactionReceipt from '../../components/snet-ada-eth-conversion-form/TransactionReceipt';
import { availableBlockchains, conversionSteps } from '../../utils/ConverterConstants';
import { conversionClaim, getConversionStatus } from '../../utils/HttpRequests';
import { bigNumberSubtract, convertFromCogs } from '../../utils/bignumber';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import SnetLoader from '../../components/snet-loader';

const ADATOERC20ETH = () => {
  const { generateSignatureForClaim, conversionIn } = useWalletHook();
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionReceipt, setTransactionReceipt] = useState([]);
  const { conversionStepsForAdaToEth, activeStep, conversion } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);
  const { conversionPair } = conversion;
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setConversionDirection(availableBlockchains.ETHEREUM));
  };

  const checkConversionStatus = async () => {
    setInterval(async () => {
      try {
        if (activeStep === conversionSteps.BURN_TOKENS) {
          const response = await getConversionStatus(conversion.conversionId);
          const depositAmount = convertFromCogs(response.conversion.deposit_amount, conversionPair.fromPair.allowed_decimal);
          const receievingAmount = bigNumberSubtract(depositAmount, conversion.conversionCharge.amount);
          dispatch(setAdaConversionInfo({ depositAmount, receievingAmount, status: response.conversion.status }));
        }
      } catch (error) {
        console.log(error);
      }
    }, 60000);
  };

  const updateLoaderStatus = (isLoading, message = '', title = 'Awaiting Confirmation...') => {
    setLoader({ isLoading, message, title });
  };

  const claimTheTokens = async (conversionId, amount, signature) => {
    try {
      const decimals = 8;
      const contractAddress = '0xc91DA085056Dd47daA4cf5046570bC1837020079';

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
      updateLoaderStatus(true, 'Please sign from wallet...');
      const amount = conversion.depositAmount;
      const { toAddress, fromAddress, conversionId } = conversion;
      const signature = await generateSignatureForClaim(conversionId, amount, fromAddress, toAddress);
      const response = await conversionClaim(conversionId, amount, signature, toAddress, fromAddress);
      updateLoaderStatus(true, 'Please confirm the transaction on your wallet...');
      const txn = await claimTheTokens(conversionId, response.claim_amount, response.signature);
      setTransactionHash(txn.transactionHash);
      const receipt = generateReceipt(
        conversion.depositAmount,
        conversion.receievingAmount,
        conversion.conversionCharge.amount,
        conversionPair.fromPair.symbol,
        conversionPair.toTokenPair.symbol
      );
      setTransactionReceipt(receipt);
      dispatch(setActiveStep(conversionSteps.SUMMARY));
    } catch (error) {
      console.log(error);
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    if (activeStep === conversionSteps.BURN_TOKENS) {
      checkConversionStatus();
    }
  }, [activeStep]);

  return (
    <SnetPaper>
      <SnetLoader dialogBody={loader.message} onDialogClose={() => {}} isDialogOpen={loader.isLoading} dialogTitle={loader.title} />
      <SnetAdaEthTitle title="Converting AGIX [ADA] to AGIX [ETH]" />
      <Box sx={styles.padding}>
        <SnetAdaEthSteps activeStep={activeStep} steps={conversionStepsForAdaToEth} />
        {activeStep === conversionSteps.DEPOSIT_TOKENS || activeStep === conversionSteps.BURN_TOKENS ? (
          <DepositAndBurnTokens onClickCancel={handleCancel} />
        ) : null}
        {activeStep === conversionSteps.CLAIM_TOKENS ? <ClaimTokens onClickClaim={getSignatureForClaim} /> : null}
        {activeStep === conversionSteps.SUMMARY ? <TransactionReceipt txnHash={transactionHash} receiptLines={transactionReceipt} /> : null}
      </Box>
    </SnetPaper>
  );
};

export default ADATOERC20ETH;
