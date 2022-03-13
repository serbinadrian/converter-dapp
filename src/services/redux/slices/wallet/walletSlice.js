import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallets',
  initialState: { wallets: [], signature: '', fromAddress: null, toAddress: null },
  reducers: {
    setFromAddress: (state, action) => {
      state.fromAddress = action.payload;
    },
    setToAddress: (state, action) => {
      state.toAddress = action.payload;
    },
    setWallets(state, action) {
      state.wallets = action.payload;
    },
    setSignature(state, action) {
      state.signature = action.payload;
    }
  }
});

export const { setWallets, setSignature, setFromAddress, setToAddress } = walletSlice.actions;

export default walletSlice;
