import { createReducer } from '@reduxjs/toolkit';
import { REQUEST_STATUSES } from 'constants/index';

const initReducer = (initialState, actions) => {
    return createReducer(initialState, {
        [actions.getLatestPending]: (state) => ({
            ...state,
            getLatestStatus: REQUEST_STATUSES.PENDING,
            getLatestRequestError: initialState.getLatestRequestError
        }),
        [actions.getLatestSuccess]: (state, action) => ({
            ...state,
            latestRates: action.payload,
            getLatestStatus: REQUEST_STATUSES.SUCCESS
        }),
        [actions.getLatestFailure]: (state, action) => ({
            ...state,
            getLatestStatus: REQUEST_STATUSES.FAILURE,
            getLatestRequestError: action.payload
        })
    });
};

export default initReducer;
