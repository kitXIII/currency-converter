import { useReducer, useCallback } from 'react';

const _useReducer = (reducer, initialState) => {
    const [state, _dispatch] = useReducer(reducer, initialState);

    const dispatch = useCallback((action) => {
        if (typeof action === 'function') {
            action(_dispatch);
        } else {
            _dispatch(action);
        }
    }, []);

    return [state, dispatch];
};

export default _useReducer;
