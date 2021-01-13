import { createAction } from '@reduxjs/toolkit';

import get from 'lodash/get';
import keys from 'lodash/keys';

import Api from 'services/Api'

export const setSymbolFrom = createAction('SET_FROM_SYMBOL');
export const setValueFrom = createAction('SET_FROM_VALUE');
export const setSymbolTo = createAction('SET_TO_SYMBOL');
export const setValueTo = createAction('SET_TO_VALUE');
export const changeSymbols = createAction('CHANGE_SYMBOLS');

// GET SYMBOL LIST
export const getSymbolListPending = createAction('GET_SYMBOL_LIST_PENDING');
export const getSymbolListSuccess = createAction('GET_SYMBOL_LIST_SUCCESS');
export const getSymbolListFailure = createAction('GET_SYMBOL_LIST_FAILURE');

export const getSymbolList = () => async (dispatch) => {
    dispatch(getSymbolListPending());

    try {
        const result = await Api.getLatest();

        const first = get(result, 'base', null);
        const other = keys(get(result, 'rates', {}));
        const symbols = [first, ...other].filter(v => v);

        dispatch(getSymbolListSuccess(symbols));
    } catch (error) {
        dispatch(getSymbolListFailure(error));
    }
}

// GET LATEST RATES FOR 2 SYMBOLS
export const getLatestPending = createAction('GET_LATEST_PENDING');
export const getLatestSuccess = createAction('GET_LATEST_SUCCESS');
export const getLatestFailure = createAction('GET_LATEST_FAILURE');
export const resetGetLatestFailure = createAction('RESET_GET_LATEST_FAILURE');

export const getLatestForSymbols = (symbols) => async (dispatch) => {
    dispatch(getLatestPending());
    const from = get(symbols, 'from', null);
    const to = get(symbols, 'to', null);

    if (!from || !to) {
        throw new Error('Empty arguments');
    }

    try {
        const result = await Api.getLatest({ symbols: [from, to].join(','), base: from });
        dispatch(getLatestSuccess(result));
    } catch (error) {
        dispatch(getLatestFailure(error));
    }
}
