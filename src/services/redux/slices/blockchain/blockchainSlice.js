import { createSlice } from '@reduxjs/toolkit';
import { progress } from '../../utils';
import { getAvailableBlockchains } from './blockchainActions';

const blockchainSlice = createSlice({
  name: 'blockchains',
  initialState: { entities: [], loading: progress.PENDING, blockchainStatus: null },
  reducers: {
    setBlockchainStatus: (state, action) => {
      state.blockchainStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAvailableBlockchains.pending, (state) => {
      state.loading = progress.PENDING;
    });
    builder.addCase(getAvailableBlockchains.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = progress.IDLE;
    });
  }
});

export const { setBlockchainStatus } = blockchainSlice.actions;

export default blockchainSlice;
