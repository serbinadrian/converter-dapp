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

const ERC20TOADA = () => {
  const { blockchains } = useSelector((state) => state);
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
  const { fetchWalletBalance, getAllowanceInfo } = useERC20TokenHook();

  const getBalanceFromWallet = async () => {
    const balanceInfo = await fetchWalletBalance(fromTokenPair.token_address);
    updateWalletBalance(balanceInfo);
  };

  useEffect(() => {
    if (!isEmpty(fromTokenPair) && toUpper(fromTokenPair.blockchain.name) === availableBlockchains.ETHEREUM && Number(fromAndToTokenValues.fromValue) > 0) {
      console.log(fromAndToTokenValues.fromValue);
      console.log('fromAndToTokenValues', fromTokenPair);
    }
  }, [fromAndToTokenValues]);

  useEffect(() => {
    if (!isEmpty(fromTokenPair) && toUpper(fromTokenPair.blockchain.name) === availableBlockchains.ETHEREUM) {
      getBalanceFromWallet();
    }
  }, [fromTokenPair]);

  const onClickAuhorize = () => {};

  const onClickConvert = () => {};

  if (blockchains.entities.length === 0) {
    return (
      <SnetPaper>
        <ConversionFormLoader />
      </SnetPaper>
    );
  }

  return (
    <SnetPaper>
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
        <SnetButton disabled name="Convert" onClick={onClickConvert} />
        <SnetButton disabled name="Authorize" onClick={onClickAuhorize} />
      </Stack>
    </SnetPaper>
  );
};

export default ERC20TOADA;
