import fetch from 'utils/fetch';
import routes from 'utils/routes';

const Api = {
    getLatest(params) {
        const path = routes.latestUrl();
        return fetch.get(path, { params }).then((res) => res.data);
    }
}

export default Api;
