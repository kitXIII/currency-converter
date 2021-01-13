import { createReducer } from '@reduxjs/toolkit';
import { REQUEST_STATUSES } from 'constants/index';

const initReducer = (initialState, actions) => {
    return createReducer(initialState, {
        // SYMBOL LIST
        [actions.getSymbolListPending]: (state) => ({
            ...state,
            getSymbolListRequestError: initialState.getSymbolListRequestError,
            getSymbolListRequestStatus: REQUEST_STATUSES.PENDING
        }),
        [actions.getSymbolListSuccess]: (state, action) => ({
            ...state,
            symbols: action.payload,
            getSymbolListRequestStatus: REQUEST_STATUSES.SUCCESS
        }),
        [actions.getLatestFailure]: (state, action) => ({
            ...state,
            getSymbolListRequestError: action.payload,
            getSymbolListRequestStatus: REQUEST_STATUSES.FAILURE
        }),

        // LATEST RATES FOR 2 SYMBOLS
        [actions.getLatestPending]: (state) => ({
            ...state,
            getLatestRequestError: initialState.getLatestRequestError,
            getLatestRequestStatus: REQUEST_STATUSES.PENDING
        }),
        [actions.getLatestSuccess]: (state, action) => ({
            ...state,
            latestRates: action.payload,
            getLatestRequestStatus: REQUEST_STATUSES.SUCCESS
        }),
        [actions.getLatestFailure]: (state, action) => ({
            ...state,
            getLatestRequestError: action.payload,
            getLatestRequestStatus: REQUEST_STATUSES.FAILURE
        })
    });
};

export default initReducer;
