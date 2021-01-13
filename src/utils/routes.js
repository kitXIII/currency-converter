import { API_URL } from 'constants/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    latestUrl: () => [API_URL, 'latest'].join('/')
};
