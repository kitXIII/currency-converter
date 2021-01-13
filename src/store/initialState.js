
import { REQUEST_STATUSES } from 'constants/index';

const initialState = {
    latestRates: {},
    getLatestStatus: REQUEST_STATUSES.INIT,
    getLatestRequestError: null
};

export default initialState;
