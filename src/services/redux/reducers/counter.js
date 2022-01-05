import { createReducer } from '@reduxjs/toolkit'

const counterReducer = createReducer(
    {
        counter: 0,
        sumOfNumberPayloads: 0,
        unhandledActions: 0,
    },
    (builder) => {
        builder.addDefaultCase(() => {})
    }
)

export default counterReducer