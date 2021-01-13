import { useEffect } from 'react';
import { useSelector, useDispatch, actions } from 'store';

import { REQUEST_STATUSES } from 'constants/index';

const App = () => {
    const latestRequestStatus = useSelector((state) => state.getLatestRequestStatus);
    const symbolsRequestStatus = useSelector((state) => state.getSymbolListRequestStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSymbolList());
    }, [dispatch]);

    const handleClick = () => {
        if (latestRequestStatus === REQUEST_STATUSES.PENDING) {
            return;
        }

        dispatch(actions.getLatestForSymbols({ from: 'USD', to: 'EUR' }));
    };

    if (symbolsRequestStatus === REQUEST_STATUSES.PENDING) {
        return 'Loading...'
    }

    if (symbolsRequestStatus === REQUEST_STATUSES.FAILURE) {
        return 'Error...';
    }

    return (
        <div className='App'>
            <button type='button' onClick={handleClick}>
                click me
            </button>
        </div>
    );
};

export default App;
