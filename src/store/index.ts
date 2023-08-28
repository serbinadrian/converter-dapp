import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import applicationSlice from './modules/application/applicationSlice';

const reducer: ReducersMapObject = {
    application: applicationSlice.reducer,
}

const store: ToolkitStore = configureStore({reducer});

export default store;
