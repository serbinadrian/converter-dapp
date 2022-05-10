import { createSlice } from '@reduxjs/toolkit';
import { availableBlockchains, conversionStatuses, conversionSteps, conversionStepsForAdaToEth, progress } from '../../../../utils/ConverterConstants';
// import { progress } from '../../utils';
import { getAvailableTokenPairs } from './tokenPairActions';

const tokenPairSlice = createSlice({
  name: 'tokenPairs',
  initialState: {
    conversionApiCallIntervalIds: [],
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
    setConversionApiCallIntervalIds(state, action) {
      state.conversionApiCallIntervalIds.push(action.payload);
    },
    resetConversionApiCallIntervalIds(state) {
      state.conversionApiCallIntervalIds = [];
    },
    setConversionDirection(state, action) {
      state.conversionDirection = action.payload;
    },
    setAdaConversionInfo(state, action) {
      state.conversionOfAdaToEth.conversion = { ...state.conversionOfAdaToEth.conversion, ...action.payload };
    },
    setActiveStep(state, action) {
      state.conversionOfAdaToEth.activeStep = action.payload;
      state.conversionOfAdaToEth.conversionStepsForAdaToEth[action.payload - 1].progress = progress.COMPLETE;
      state.conversionOfAdaToEth.conversionStepsForAdaToEth[action.payload].progress = progress.PROCESSING;
    },
    setConversionStatus(state, action) {
      state.conversionOfAdaToEth.conversion.status = action.payload;
    },
    setCurrentConversionStep: (state, action) => {
      state.conversionOfAdaToEth.conversionStepsForAdaToEth[action.payload.activeStep].progress = action.payload.progress;
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

export const {
  setConversionDirection,
  setActiveStep,
  setAdaConversionInfo,
  setConversionStatus,
  setConversionApiCallIntervalIds,
  resetConversionApiCallIntervalIds
} = tokenPairSlice.actions;

export default tokenPairSlice;
