import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { isNil, toUpper } from 'lodash';
import SnetPaper from '../../components/snet-paper';
import SnetButton from '../../components/snet-button';
import TokenPairs from './TokenPairs';
import { useConverterHook } from './hooks/ConverterHook';
import { generateConversionID } from '../../utils/HttpRequests';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import SnetLoader from '../../components/snet-loader';
import ConversionCharges from '../../components/sent-conversion-charges';
import { availableBlockchains } from '../../utils/ConverterConstants';
import SnetSnackbar from '../../components/snet-snackbar';
import axios from '../../utils/Axios';
import SnetConversionStatus from '../../components/snet-conversion-status';

const ConverterForm = () => {
  const [conversionPopup, setConversionPopup] = useState({ open: false, title: 'Converting AGIX [ETH] to AGIX [ADA]', link: '' });
  const [error, setError] = useState({ open: false, message: '' });
  const [showFetchAmountFromWallet, setShowFetchAmountFromWallet] = useState(false);
  const [isAuthorizationRequired, setIsAuthorizationRequired] = useState(false);
  const [isTokenConvertible, setIsTokenConvertible] = useState(false);
  const [walletBalance, setWalletbalance] = useState({ balance: 0, symbol: '' });
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });
  const {
    isConversionDisabled,
    fromTokenPairs,
    toTokenPairs,
    fromAndToTokenValues,
    handleFromInputChange,
    handleToInputChange,
    tokenPair,
    swapPairs,
    onSelectingFromToken,
    onSelectingToToken,
    fromAndToTokenPair,
    conversionCharge,
    setWalletAmount,
    getAddress
  } = useConverterHook();
  const { balanceFromWallet, approveSpender, signMessage, getLatestBlock, address, conversionOut, checkAllowance } = useWalletHook();

  const updateLoaderStatus = (isLoading, message = '', title = 'Awaiting Confirmation...') => {
    setLoader({ isLoading, message, title });
  };

  const updateTxnHash = async (conversionId, txnHash) => {
    try {
      const payload = { conversion_id: conversionId, transaction_hash: txnHash };
      await axios.post('transaction', payload);
    } catch (error) {
      throw error.toString();
    }
  };

  const convertEthToAda = async (amount, conversionId, signature) => {
    try {
      const message = 'Please confirm your transaction from your wallet';
      updateLoaderStatus(true, message);
      const contractAddress = tokenPair.contract_address;
      const decimals = tokenPair.from_token.allowed_decimal;
      const response = await conversionOut(contractAddress, amount, conversionId, signature, decimals);
      await updateTxnHash(conversionId, response.transactionHash);
      const link = `${process.env.REACT_APP_ETHERSCAN_TXN_BASE_URL}/${response.transactionHash}`;
      setConversionPopup({ ...conversionPopup, open: true, link });
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
  };

  const createConversionIdForEthToAda = async () => {
    try {
      updateLoaderStatus(true, 'Please sign from your wallet');
      const amountToLock = fromAndToTokenValues.fromValue;
      const blockNumber = await getLatestBlock();
      const toTokenAddress = getAddress(availableBlockchains.CARDANO);
      const fromTokenAddress = address;
      const personalSignature = await signMessage(tokenPair.id, amountToLock, fromTokenAddress, toTokenAddress);
      const { id, signature } = await generateConversionID(tokenPair.id, amountToLock, personalSignature, blockNumber, fromTokenAddress, toTokenAddress);
      return { conversionId: id, signature, amountToLock };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onConvert = async () => {
    try {
      const { amountToLock, conversionId, signature } = await createConversionIdForEthToAda();
      await convertEthToAda(amountToLock, conversionId, signature);
      updateLoaderStatus(false);
    } catch (error) {
      const e = error.message || error;
      updateLoaderStatus(false);
      setError({ open: true, message: e });
    }
  };

  const getAllowanceInfo = async () => {
    try {
      const tokenContractAddress = fromAndToTokenPair.fromPair.token_address;
      const spender = tokenPair.contract_address;
      const allowance = await checkAllowance(tokenContractAddress, address, spender);
      console.log(`Allowance at token contract ${tokenContractAddress} is ${allowance} for ${address}, spender is ${spender}`);
      if (allowance < fromAndToTokenValues.fromValue) {
        setIsAuthorizationRequired(true);
        setIsTokenConvertible(false);
      } else {
        setIsAuthorizationRequired(false);
        setIsTokenConvertible(true);
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const onClickAuhorize = async () => {
    try {
      updateLoaderStatus(true, 'Please confirm transaction', 'Awaiting confirmation ...');

      const tokenContractAddress = fromAndToTokenPair.fromPair.token_address;

      console.log('Authorization Token Contract Address:', tokenContractAddress);

      const spender = tokenPair.contract_address;
      console.log('Authorization Spender address', spender);

      await approveSpender(tokenContractAddress, spender);

      setIsAuthorizationRequired(false);
      setIsTokenConvertible(true);

      updateLoaderStatus(false);
    } catch (error) {
      const e = error.message || error;
      updateLoaderStatus(false);
      setError({ open: true, message: e });
    }
  };

  const fetchBalance = async (token) => {
    onSelectingFromToken(token);
    const tokenContractAddress = token.token_address;
    console.log('onSelectingFromToken tokenContractAddress', tokenContractAddress);
    const { balance, symbol } = await balanceFromWallet(tokenContractAddress);
    setWalletbalance({ balance, symbol });
  };

  const onUseFullamount = () => {
    setWalletAmount(walletBalance.balance);
  };

  const fetchBalanceAndSelect = (token) => {
    fetchBalance(token);
    onSelectingToToken(token);
  };

  useEffect(() => {
    if (!isNil(fromAndToTokenPair.fromPair.id)) {
      if (toUpper(fromAndToTokenPair.fromPair.blockchain.name) === availableBlockchains.ETHEREUM) {
        setShowFetchAmountFromWallet(true);
      } else {
        setShowFetchAmountFromWallet(false);
      }
    }
  }, [fromAndToTokenPair]);

  useEffect(() => {
    if (fromAndToTokenValues.fromValue > 0) {
      getAllowanceInfo();
    }
  }, [fromAndToTokenValues, fromAndToTokenPair]);

  const toggleConversionPopup = () => {
    setConversionPopup({ ...conversionPopup, open: !conversionPopup.open });
  };

  return !isConversionDisabled ? (
    <>
      <SnetConversionStatus
        isDialogOpen={conversionPopup.open}
        title={conversionPopup.title}
        amount={fromAndToTokenValues.fromValue}
        tokenName={fromAndToTokenPair.fromPair.symbol}
        link={conversionPopup.link}
        onDialogClose={toggleConversionPopup}
      />
      <SnetSnackbar
        open={error.open}
        message={error.message}
        onClose={() => {
          setError({ open: false, message: '' });
        }}
      />
      <SnetLoader dialogBody={loader.message} onDialogClose={() => {}} isDialogOpen={loader.isLoading} dialogTitle={loader.title} />
      <SnetPaper>
        {fromAndToTokenPair.fromPair ? (
          <TokenPairs
            onSelectingFromToken={fetchBalance}
            onSelectingToToken={fetchBalanceAndSelect}
            showFetchAmountFromWallet={showFetchAmountFromWallet}
            fromTokenPair={fromAndToTokenPair.fromPair}
            toTokenPair={fromAndToTokenPair.toTokenPair}
            fromBlockchains={fromTokenPairs}
            toBlockchains={toTokenPairs}
            fromInputChange={handleFromInputChange}
            fromInputValue={fromAndToTokenValues.fromValue}
            toInputChange={handleToInputChange}
            toInputValue={fromAndToTokenValues.toValue}
            onSwapPairs={swapPairs}
            balance={walletBalance.balance}
            tokenSymbol={walletBalance.symbol}
            onUseFullamount={onUseFullamount}
          />
        ) : null}
        {conversionCharge.amount > 0 ? <ConversionCharges conversionFee={conversionCharge.amount} conversionSymbol={conversionCharge.symbol} /> : null}
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" padding={4}>
          <SnetButton disabled={!isTokenConvertible} name="Convert" onClick={onConvert} />
          <SnetButton disabled={!isAuthorizationRequired} name="Authorize" onClick={onClickAuhorize} />
        </Stack>
      </SnetPaper>
    </>
  ) : null;
};

export default ConverterForm;
