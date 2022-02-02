import { configureStore } from '@reduxjs/toolkit';
import blockchainSlice from './slices/blockchain/blockchainSlice';
import tokenPairSlice from './slices/tokenPairs/tokenPairSlice';

const reducer = {
  blockchains: blockchainSlice.reducer,
  tokenPairs: tokenPairSlice.reducer
};

const store = configureStore({ reducer, devTools: process.env.NODE_ENV === 'development' });

export default store;
