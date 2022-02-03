import { createSlice } from '@reduxjs/toolkit';
import { progress } from '../../utils';
import { getAvailableTokenPairs } from './tokenPairActions';

const tokenPairSlice = createSlice({
  name: 'tokenPairs',
  initialState: { tokens: [], loading: progress.PENDING },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailableTokenPairs.pending, (state) => {
      state.loading = progress.PENDING;
    });
    builder.addCase(getAvailableTokenPairs.fulfilled, (state, action) => {
      state.tokens = action.payload;
      state.loading = progress.IDLE;
    });
  }
});

export default tokenPairSlice;
