
import { REQUEST_STATUSES } from 'constants/index';

const initialState = {
    symbols: [],
    latestRates: {},
    getLatestRequestStatus: REQUEST_STATUSES.INIT,
    getLatestRequestError: null,
    getSymbolListRequestStatus: REQUEST_STATUSES.INIT,
    getSymbolListRequestError: null
};

export default initialState;
