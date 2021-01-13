import { useEffect } from 'react';
import { useSelector, useDispatch, actions } from 'store';
import selectStatusHelper from 'utils/statuses';

import Converter from 'components/Converter/Converter';
import Error from 'components/Error/Error';
import Layout from 'components/Layout/Layout';
import Loader from 'components/Loader/Loader';

const symbolRequestStatusSelector = (state) => state.getSymbolListRequestStatus;

const App = () => {
    const symbolsRequestStatus = useSelector(selectStatusHelper(symbolRequestStatusSelector));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSymbolList());
    }, [dispatch]);

    return (
        <Layout>
            {symbolsRequestStatus.isSuccess && <Converter />}
            {symbolsRequestStatus.isPending && <Loader />}
            {symbolsRequestStatus.isFailure && <Error />}
        </Layout>
    );
};

export default App;
