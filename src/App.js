import { useSelector, useDispatch, actions } from 'store';

import { REQUEST_STATUSES } from 'constants/index';

const App = () => {
    const requestStatus = useSelector((state) => state.getLatestStatus);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (requestStatus === REQUEST_STATUSES.PENDING) {
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
