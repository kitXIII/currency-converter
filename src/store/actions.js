import { createAction } from '@reduxjs/toolkit';
import get from 'lodash/get';
import Api from 'services/Api'

export const getLatestPending = createAction('GET_LATEST_PENDING');
export const getLatestSuccess = createAction('GET_LATEST_SUCCESS');
export const getLatestFailure = createAction('GET_LATEST_FAILURE');

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
