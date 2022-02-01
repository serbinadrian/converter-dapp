import { createSlice } from '@reduxjs/toolkit';
import { progress } from '../../utils';
import { getAvailableBlockchains } from './blockchainActions';

const blockchainSlice = createSlice({
  name: 'blockchains',
  initialState: { entities: [], loading: progress.PENDING },
  reducers: {},
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

export default blockchainSlice;
