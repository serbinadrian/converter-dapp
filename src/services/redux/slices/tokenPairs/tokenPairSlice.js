import { createSlice } from '@reduxjs/toolkit';
import { availableBlockchains, conversionStatuses, conversionSteps, conversionStepsForAdaToEth } from '../../../../utils/ConverterConstants';
import { progress } from '../../utils';
import { getAvailableTokenPairs } from './tokenPairActions';

const tokenPairSlice = createSlice({
  name: 'tokenPairs',
  initialState: {
    conversionOfAdaToEth: {
      conversionStepsForAdaToEth,
      activeStep: conversionSteps.DEPOSIT_TOKENS,
      conversion: {
        depositAmount: 0,
        conversionId: '',
        signature: '',
        depositAddress: '',
        toAddress: '',
        fromAddress: '',
        status: conversionStatuses.IDLE
      }
    },
    conversionDirection: availableBlockchains.ETHEREUM,
    tokens: [],
    loading: progress.PENDING
  },
  reducers: {
    setConversionDirection(state, action) {
      state.conversionDirection = action.payload;
    },
    setAdaConversionInfo(state, action) {
      state.conversionOfAdaToEth.conversion = { ...state.conversionOfAdaToEth.conversion, ...action.payload };
    },
    setActiveStep(state, action) {
      state.conversionOfAdaToEth.activeStep = action.payload;
    },
    setConversionStatus(state, action) {
      state.conversionOfAdaToEth.conversion.status = action.payload;
    }
  },
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

export const { setConversionDirection, setActiveStep, setAdaConversionInfo, setConversionStatus } = tokenPairSlice.actions;

export default tokenPairSlice;
