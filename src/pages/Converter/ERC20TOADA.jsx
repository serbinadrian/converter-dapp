import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Stack } from '@mui/material';
import { toUpper, isEmpty, isNil } from 'lodash';
import SnetPaper from '../../components/snet-paper';
import useConverterHook from './hooks/ConverterHook';
import ConversionFormLoader from './ConversionFormLoader';
import TokenPairs from './TokenPairs';
import useERC20TokenHook from './hooks/ERC20TokenHook';
import { availableBlockchains, conversionDirections } from '../../utils/ConverterConstants';
import SnetAlert from '../../components/snet-alert';
import SnetLoader from '../../components/snet-loader';
import SnetConversionStatus from '../../components/snet-conversion-status';
import ADATOETHButton from '../../components/snet-converter-form-buttons/ADATOETHButton';
import ETHTOADAButton from '../../components/snet-converter-form-buttons/ETHTOADAButton';
import SnetSnackbar from '../../components/snet-snackbar';

const ERC20TOADA = ({ onADATOETHConversion }) => {
  const { blockchains, wallet } = useSelector((state) => state);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorRedirectTo, seterrorRedirectTo] = useState(null);
  const { conversionDirection } = useSelector((state) => state.wallet);
  const {
    fromBlockchains,
    toBlockchains,
    fromSelectedBlockchain,
    toSelectedBlockchain,
    handleFromBlockchainSelection,
    handleToBlockchainSelection,
    swapBlockchains,
    fromTokenPair,
    toTokenPair,
    onSelectingFromToken,
    onSelectingToToken,
    handleFromInputChange,
    handleToInputChange,
    onUseFullamount,
    fromAndToTokenValues,
    conversionCharge,
    error,
    updateWalletBalance,
    walletBalance
  } = useConverterHook();
  const {
    mintERC20Tokens,
    resetTxnInfo,
    fetchWalletBalance,
    getAllowanceInfo,
    conversionEnabled,
    authorizationRequired,
    approveSpendLimit,
    loader,
    burnERC20Tokens,
    txnInfo
  } = useERC20TokenHook();
  const { toAddress, fromAddress, wallets } = wallet;

  const getBalanceFromWallet = async () => {
    const balanceInfo = await fetchWalletBalance(fromTokenPair.token_address);
    updateWalletBalance(balanceInfo);
  };

  useEffect(() => {
    if (!isEmpty(fromTokenPair) && toUpper(fromTokenPair.blockchain.name) === availableBlockchains.ETHEREUM && Number(fromAndToTokenValues.fromValue) > 0) {
      getAllowanceInfo(fromTokenPair.id, fromAndToTokenValues.fromValue);
    }
  }, [fromAndToTokenValues, conversionDirection]);

  useEffect(() => {
    if (!isEmpty(fromTokenPair) && toUpper(fromTokenPair.blockchain.name) === availableBlockchains.ETHEREUM) {
      getBalanceFromWallet();
    }
  }, [fromTokenPair, wallets, fromAndToTokenValues, conversionDirection]);

  const onClickAuthorize = async () => {
    try {
      await approveSpendLimit(fromTokenPair.id);
    } catch (exception) {
      setErrorMessage(exception?.message || String(exception));
      seterrorRedirectTo(exception?.redirectTo || null);
    }
  };

  const getConversionIdForADATOETH = async () => {
    try {
      const conversionInfo = await mintERC20Tokens(fromTokenPair.id, fromAndToTokenValues.fromValue, fromAddress);
      onADATOETHConversion(conversionInfo);
    } catch (exception) {
      setErrorMessage(exception?.message || String(exception));
      seterrorRedirectTo(exception?.redirectTo || null);
    }
  };

  const onETHToADAConversion = async () => {
    try {
      await burnERC20Tokens(fromTokenPair.id, fromAndToTokenValues.fromValue, toAddress);
    } catch (exception) {
      setErrorMessage(exception?.message || String(exception));
      seterrorRedirectTo(exception?.redirectTo || null);
    }
  };

  const resetErrorState = () => {
    setErrorMessage(null);
    seterrorRedirectTo(null);
  };

  if (blockchains.entities.length === 0) {
    return (
      <SnetPaper>
        <ConversionFormLoader />
      </SnetPaper>
    );
  }

  return (
    <>
      <SnetSnackbar open={!isNil(errorMessage)} message={String(errorMessage)} onClose={resetErrorState} redirectTo={errorRedirectTo} />
      <SnetConversionStatus
        isDialogOpen={!isNil(txnInfo.txnLink)}
        title="Conversion Status"
        amount={txnInfo.txnAmount}
        tokenName={txnInfo.tokenSymbol}
        link={txnInfo.txnLink ?? ''}
        onDialogClose={resetTxnInfo}
      />
      <SnetPaper>
        <SnetLoader dialogBody={loader.message} onDialogClose={() => {}} isDialogOpen={loader.isLoading} dialogTitle={loader.title} />
        <TokenPairs
          fromBlockchains={fromBlockchains}
          fromSelectedBlockchain={fromSelectedBlockchain}
          toBlockchains={toBlockchains}
          toSelectedBlockchain={toSelectedBlockchain}
          handleFromBlockchainSelection={handleFromBlockchainSelection}
          handleToBlockchainSelection={handleToBlockchainSelection}
          onSwapBlockchain={() => swapBlockchains(fromAndToTokenValues.fromValue)}
          fromTokenPair={fromTokenPair}
          toTokenPair={toTokenPair}
          onSelectingFromToken={onSelectingFromToken}
          onSelectingToToken={onSelectingToToken}
          onUseFullamount={onUseFullamount}
          fromInputChange={handleFromInputChange}
          toInputChange={handleToInputChange}
          fromInputValue={fromAndToTokenValues.fromValue}
          toInputValue={fromAndToTokenValues.toValue}
          conversionFee={conversionCharge.amount}
          conversionSymbol={conversionCharge.symbol}
          walletBalance={walletBalance.balance}
          walletTokenSymbol={walletBalance.symbol}
        />
        {error.error && error.message.length ? (
          <Stack marginTop={4}>
            <SnetAlert error={error.message} />
          </Stack>
        ) : null}
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" padding={4}>
          {wallet.conversionDirection === conversionDirections.ADA_TO_ETH ? (
            <ADATOETHButton conversionEnabled={!error.message.length && !isNil(fromAddress)} onClickConvert={getConversionIdForADATOETH} />
          ) : (
            <ETHTOADAButton
              conversionEnabled={conversionEnabled && !error.error}
              authorizationRequired={authorizationRequired}
              onClickConvert={onETHToADAConversion}
              onClickAuthorize={onClickAuthorize}
            />
          )}
        </Stack>
      </SnetPaper>
    </>
  );
};

ERC20TOADA.propTypes = {
  onADATOETHConversion: propTypes.func.isRequired
};

export default ERC20TOADA;
