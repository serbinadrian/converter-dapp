import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAvailableTokenPairs } from '../../../services/redux/slices/tokenPairs/tokenPairActions';

const tokenPairDirection = {
  FROM: 'from_token',
  TO: 'to_token'
};

export const useConverterHook = () => {
  const [isConversionDisabled, setConversionDisabled] = useState(true);
  const [fromTokenPairs, setFromTokenPairs] = useState([]);
  const [toTokenPairs, setToTokenPairs] = useState([]);
  const state = useSelector((state) => state);
  const blockchains = state.blockchains.entities;
  const { tokens } = state.tokenPairs;

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

  useEffect(() => {
    if (tokens.length > 0) {
      const fromTokenPairs = getPairs(tokenPairDirection.FROM);
      const toTokenPairs = getPairs(tokenPairDirection.TO).reverse();
      setFromTokenPairs(fromTokenPairs);
      setToTokenPairs(toTokenPairs);
      setConversionDisabled(false);
    }
  }, [tokens]);

  return { tokens, isConversionDisabled, fromTokenPairs, toTokenPairs, blockchains };
};
