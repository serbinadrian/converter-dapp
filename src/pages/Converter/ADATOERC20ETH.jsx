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
import ClaimTokens from '../../components/snet-ada-eth-conversion-form/ClaimTokens';
import TransactionReceipt from '../../components/snet-ada-eth-conversion-form/TransactionReceipt';
import { availableBlockchains, conversionSteps } from '../../utils/ConverterConstants';
import { conversionClaim, getConversionStatus } from '../../utils/HttpRequests';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import SnetLoader from '../../components/snet-loader';
import Paths from '../../router/paths';

const ADATOERC20ETH = () => {
  const { generateSignatureForClaim, conversionIn } = useWalletHook();
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionReceipt, setTransactionReceipt] = useState([]);
  const { conversionStepsForAdaToEth, activeStep, conversion } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);

  const { fromAddress, toAddress } = useSelector((state) => state.wallet);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setConversionDirection(availableBlockchains.ETHEREUM));
  };

  const checkConversionStatus = async () => {
    setInterval(async () => {
      try {
        if (activeStep === conversionSteps.BURN_TOKENS) {
          const response = await getConversionStatus(conversion.conversionId);
          console.log(response);
          dispatch(setConversionStatus(response.conversion.status));
        }
      } catch (error) {
        console.log(error);
      }
    }, 60000);
  };

  const updateLoaderStatus = (isLoading, message = '', title = 'Awaiting Confirmation...') => {
    setLoader({ isLoading, message, title });
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
      updateLoaderStatus(true, 'Please sign from wallet...');
      const amount = conversion.depositAmount;
      const { conversionId } = conversion;
      const decimals = conversion.pair.from_token.allowed_decimal;
      const signature = await generateSignatureForClaim(conversionId, amount, fromAddress, toAddress);
      const response = await conversionClaim(conversionId, amount, signature, toAddress, fromAddress);

      updateLoaderStatus(true, 'Please confirm the transaction on your wallet...');
      const contractAddress = conversion.pair.contract_address;
      const txnHash = await claimTheTokens(contractAddress, conversionId, response.claim_amount, response.signature, decimals);
      setTransactionHash(txnHash);

      const receipt = generateReceipt(
        conversion.depositAmount,
        conversion.receievingAmount,
        conversion.conversionFees,
        conversion.pair.from_token.symbol,
        conversion.pair.to_token.symbol
      );
      setTransactionReceipt(receipt);
      dispatch(setActiveStep(conversionSteps.SUMMARY));
    } catch (error) {
      console.log(error);
    } finally {
      updateLoaderStatus(false);
    }
  };

  const continueLater = () => {
    navigate(Paths.Transactions);
  };

  const formatConversionTitle = () => {
    const { pair } = conversion;
    const from = `${pair.from_token.symbol} [${pair.from_token.blockchain.symbol}]`;
    const to = `${pair.to_token.symbol} [${pair.to_token.blockchain.symbol}]`;
    return `Converting ${from} to ${to}`;
  };

  useEffect(() => {
    if (activeStep === conversionSteps.BURN_TOKENS) {
      checkConversionStatus();
    }
  }, [activeStep]);

  return (
    <SnetPaper>
      <SnetLoader dialogBody={loader.message} onDialogClose={() => {}} isDialogOpen={loader.isLoading} dialogTitle={loader.title} />
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
