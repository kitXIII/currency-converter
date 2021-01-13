import React, { useContext, useMemo } from 'react';

import { StateContext, DispatchContext } from './contexts';
import useReducer from './useReducer';
import initialState from './initialState';
import initReducer from './reducer';
import * as actions from './actions';

const reducer = initReducer(initialState, actions);

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    );
};

const useSelector = (selector) => {
    const state = useContext(StateContext);
    const part = useMemo(() => selector(state), [selector, state]);

    return part;
};

const useDispatch = () => useContext(DispatchContext);

export { Provider, useSelector, useDispatch, actions };
