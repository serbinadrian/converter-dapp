import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBlockchains } from '../../../../utils/HttpRequests';

export const getAvailableBlockchains = createAsyncThunk('blockchains', async () => {
  const blockchains = await getBlockchains();
  return blockchains;
});
