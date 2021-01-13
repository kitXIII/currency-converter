import { createReducer } from '@reduxjs/toolkit';

const initReducer = (initialState, actions) => {
    return createReducer(initialState, {
        [actions.setActive.toString()]: (state, { payload }) => {
            console.log('Handle');
            return ({ ...state, isActive: payload });
        }
    });
};

export default initReducer;
