import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, round } from 'lodash';
import BigNumber from 'bignumber.js';
import { getAvailableTokenPairs } from '../../../services/redux/slices/tokenPairs/tokenPairActions';

const tokenPairDirection = {
  FROM: 'from_token',
  TO: 'to_token'
};

export const useConverterHook = () => {
  const [fromBlockchain, setFromBlockchain] = useState({});
  const [toBlockchain, setToBlockchain] = useState({});
  const [isConversionDisabled, setConversionDisabled] = useState(true);
  const [fromAndToTokenValues, setFromAndToTokenPairs] = useState({ fromValue: 0, toValue: 0 });
  const [fromTokenPairs, setFromTokenPairs] = useState([]);
  const [toTokenPairs, setToTokenPairs] = useState([]);
  const [fromAndToTokenPair, setFromAndToTokenPair] = useState({ fromPair: {}, toTokenPair: {} });
  const [conversionCharge, setConversionCharge] = useState({ symbol: '', amount: 0 });
  const [tokenPair, setTokenPair] = useState({});
  const state = useSelector((state) => state);
  const blockchains = state.blockchains.entities;
  const { tokens } = state.tokenPairs;
  const { wallets } = state.wallet;

  const dispatch = useDispatch();

  useEffect(() => {
    if (tokens.length < 1) {
      dispatch(getAvailableTokenPairs());
    }
  }, []);

  const getPairs = (direction) => {
    return blockchains.map((blockchain) => {
      const tokenPairs = tokens.filter((tokenPair) => tokenPair[direction].blockchain.id === blockchain.id);
      const pairs = tokenPairs.map((tokenPair) => tokenPair[direction]);
      return { ...blockchain, pairs };
    });
  };

  const setFromAndToPairs = () => {
    const fromTokenPairs = getPairs(tokenPairDirection.FROM);
    const toTokenPairs = getPairs(tokenPairDirection.TO).reverse();
    setFromTokenPairs(fromTokenPairs);
    setToTokenPairs(toTokenPairs);
    setFromBlockchain(fromTokenPairs[0]);
    setToBlockchain(toTokenPairs[0]);
    setConversionDisabled(false);
  };

  useEffect(() => {
    if (tokens.length > 0) {
      setFromAndToPairs();
    }
  }, [tokens]);

  const setWalletAmount = (amount) => {
    const amountInString = amount.toString();
    setFromAndToTokenPairs({ ...fromAndToTokenValues, fromValue: amountInString, toValue: amountInString });
  };

  const handleFromInputChange = (event) => {
    const { value } = event.target;
    setFromAndToTokenPairs({ ...fromAndToTokenValues, fromValue: value, toValue: value });
  };

  const handleToInputChange = (event) => {
    const { value } = event.target;
    setFromAndToTokenPairs({ ...fromAndToTokenValues, toValue: value, fromValue: value });
  };

  const updateConversionFees = () => {
    const { fromValue } = fromAndToTokenValues;
    if (fromValue > 0 && !isEmpty(tokenPair)) {
      let percentageFromSource = 0;
      if (!isEmpty(tokenPair.conversion_fee)) {
        percentageFromSource = BigNumber(tokenPair.conversion_fee.percentage_from_source);
      }

      const { symbol } = tokenPair.from_token;

      const fee = round((percentageFromSource * fromValue) / 100, 2);

      setConversionCharge({ amount: fee, symbol });
    }
  };

  const updateTokenPairId = () => {
    const [selectedPair] = tokens.filter((token) => {
      return token.from_token.id === fromAndToTokenPair.fromPair.id && token.to_token.id === fromAndToTokenPair.toTokenPair.id;
    });

    setTokenPair(selectedPair);
  };

  const onSelectingFromToken = (pair) => {
    const [selectedPair] = tokens.filter((token) => {
      return token.from_token.id === pair.id;
    });
    setFromAndToTokenPair({ toTokenPair: selectedPair.to_token, fromPair: pair });
  };

  const onSelectingToToken = (pair) => {
    const [selectedPair] = tokens.filter((token) => {
      return token.to_token.id === pair.id;
    });
    setFromAndToTokenPair({ fromPair: selectedPair.from_token, toTokenPair: pair });
  };

  useEffect(() => {
    updateConversionFees();
  }, [fromAndToTokenValues]);

  useEffect(() => {
    if (fromAndToTokenPair.fromPair.id !== undefined && fromAndToTokenPair.toTokenPair.id !== undefined) {
      updateTokenPairId();
    }
  }, [fromAndToTokenPair]);

  const getAddress = (blockchain) => {
    const [address] = wallets.filter((wallet) => wallet[blockchain]);
    return address[blockchain] ?? '';
  };

  const swapPairs = () => {};

  return {
    tokenPair,
    tokens,
    isConversionDisabled,
    fromTokenPairs,
    toTokenPairs,
    blockchains,
    handleFromInputChange,
    handleToInputChange,
    fromAndToTokenValues,
    swapPairs,
    onSelectingFromToken,
    onSelectingToToken,
    fromAndToTokenPair,
    conversionCharge,
    setWalletAmount,
    getAddress,
    fromBlockchain,
    toBlockchain,
    setFromBlockchain,
    setToBlockchain
  };
};
