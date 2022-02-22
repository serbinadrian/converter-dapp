import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallets',
  initialState: { wallets: [], signature: '' },
  reducers: {
    setWallets(state, action) {
      state.wallets = action.payload;
    },
    setSignature(state, action) {
      state.signature = action.payload;
    }
  }
});

export const { setWallets, setSignature } = walletSlice.actions;

export default walletSlice;
