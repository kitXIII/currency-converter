import { createReducer } from '@reduxjs/toolkit';
import { REQUEST_STATUSES } from 'constants/index';

const initReducer = (initialState, actions) => {
    return createReducer(initialState, {
        [actions.setSymbolFrom]: (state, action) => ({ ...state, symbolFrom: action.payload }),
        [actions.setValueFrom]: (state, action) => ({ ...state, valueFrom: action.payload }),
        [actions.setSymbolTo]: (state, action) => ({ ...state, symbolTo: action.payload }),
        [actions.setValueTo]: (state, action) => ({ ...state, valueTo: action.payload }),
        [actions.changeSymbols]: (state) => ({
            ...state,
            symbolFrom: state.symbolTo,
            symbolTo: state.symbolFrom
        }),

        // SYMBOL LIST
        [actions.getSymbolListPending]: (state) => ({
            ...state,
            getSymbolListRequestError: initialState.getSymbolListRequestError,
            getSymbolListRequestStatus: REQUEST_STATUSES.PENDING
        }),
        [actions.getSymbolListSuccess]: (state, action) => ({
            ...state,
            symbolFrom: action.payload[0],
            symbolTo: action.payload[1],
            symbols: action.payload,
            getSymbolListRequestStatus: REQUEST_STATUSES.SUCCESS
        }),
        [actions.getLatestFailure]: (state, action) => ({
            ...state,
            getSymbolListRequestError: action.payload,
            getSymbolListRequestStatus: REQUEST_STATUSES.FAILURE
        }),
        [actions.resetGetLatestFailure]: (state, action) => ({
            ...state,
            getSymbolListRequestError: initialState.getSymbolListRequestError,
            getSymbolListRequestStatus: REQUEST_STATUSES.INIT
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
