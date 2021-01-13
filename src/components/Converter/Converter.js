import { useSelector, useDispatch, actions } from 'store';

import { REQUEST_STATUSES } from 'constants/index';

const App = () => {
    const latestRequestStatus = useSelector((state) => state.getLatestRequestStatus);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (latestRequestStatus === REQUEST_STATUSES.PENDING) {
            return;
        }

        dispatch(actions.getLatestForSymbols({ from: 'USD', to: 'EUR' }));
    };

    return (
        <div className='App'>
            <button type='button' onClick={handleClick}>
                click me
            </button>
        </div>
    );
};

export default App;
