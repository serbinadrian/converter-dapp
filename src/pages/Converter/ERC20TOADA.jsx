import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { toUpper, isEmpty } from 'lodash';
import SnetPaper from '../../components/snet-paper';
import { useConverterHook } from './hooks/ConverterHook';
import ConversionFormLoader from './ConversionFormLoader';
import TokenPairs from './TokenPairs';
import SnetButton from '../../components/snet-button';
import { useERC20TokenHook } from './hooks/ERC20TokenHook';
import { availableBlockchains } from '../../utils/ConverterConstants';
import SnetAlert from '../../components/snet-alert';
import SnetLoader from '../../components/snet-loader';

const ERC20TOADA = () => {
  const { blockchains, wallet } = useSelector((state) => state);
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
  const { fetchWalletBalance, getAllowanceInfo, conversionEnabled, authorizationRequired, approveSpendLimit, loader, burnERC20Tokens } = useERC20TokenHook();
  const { toAddress } = wallet;

  const getBalanceFromWallet = async () => {
    const balanceInfo = await fetchWalletBalance(fromTokenPair.token_address);
    updateWalletBalance(balanceInfo);
  };

  useEffect(() => {
    if (!isEmpty(fromTokenPair) && toUpper(fromTokenPair.blockchain.name) === availableBlockchains.ETHEREUM && Number(fromAndToTokenValues.fromValue) > 0) {
      getAllowanceInfo(fromTokenPair.id, fromAndToTokenValues.fromValue);
    }
  }, [fromAndToTokenValues]);

  useEffect(() => {
    if (!isEmpty(fromTokenPair) && toUpper(fromTokenPair.blockchain.name) === availableBlockchains.ETHEREUM) {
      getBalanceFromWallet();
    }
  }, [fromTokenPair]);

  const onClickAuhorize = async () => {
    try {
      await approveSpendLimit(fromTokenPair.id);
    } catch (error) {
      console.log('onClickAuhorize', error);
    }
  };

  const onClickConvert = async () => {
    try {
      const txnLink = await burnERC20Tokens(fromTokenPair.id, fromAndToTokenValues.fromValue, toAddress);
    } catch (error) {
      console.log('onClickAuhorize', error);
    }
  };

  if (blockchains.entities.length === 0) {
    return (
      <SnetPaper>
        <ConversionFormLoader />
      </SnetPaper>
    );
  }

  return (
    <SnetPaper>
      <SnetLoader dialogBody={loader.message} onDialogClose={() => {}} isDialogOpen={loader.isLoading} dialogTitle={loader.title} />
      <TokenPairs
        fromBlockchains={fromBlockchains}
        fromSelectedBlockchain={fromSelectedBlockchain}
        toBlockchains={toBlockchains}
        toSelectedBlockchain={toSelectedBlockchain}
        handleFromBlockchainSelection={handleFromBlockchainSelection}
        handleToBlockchainSelection={handleToBlockchainSelection}
        onSwapBlockchain={swapBlockchains}
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
      {error.error ? (
        <Stack marginTop={4}>
          <SnetAlert error={error.message} />
        </Stack>
      ) : null}
      <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" padding={4}>
        <SnetButton disabled={!conversionEnabled} name="Convert" onClick={onClickConvert} />
        <SnetButton disabled={!authorizationRequired} name="Authorize" onClick={onClickAuhorize} />
      </Stack>
    </SnetPaper>
  );
};

export default ERC20TOADA;
