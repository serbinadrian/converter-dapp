import { configureStore } from '@reduxjs/toolkit';
import blockchainSlice from './slices/blockchain/blockchainSlice';

const reducer = {
  blockchains: blockchainSlice.reducer
};

const store = configureStore({ reducer, devTools: process.env.NODE_ENV === 'development' });

export default store;
