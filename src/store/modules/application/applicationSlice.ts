import { Slice, createSlice } from "@reduxjs/toolkit";

const applicationSlice: Slice = createSlice({
    name: "application" as string,
    initialState: {
        isLoading: false as boolean,
    },
    reducers: {
        setIsLoading: (state, action): void => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsLoading } = applicationSlice.actions;

export default applicationSlice;
