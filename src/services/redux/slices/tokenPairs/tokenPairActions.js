import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTokenPairs } from '../../../../utils/HttpRequests';

export const getAvailableTokenPairs = createAsyncThunk('tokenPairs', async () => {
  const tokenPairs = await getTokenPairs();
  return tokenPairs;
});
