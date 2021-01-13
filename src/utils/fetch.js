import axios from 'axios';

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
};

const get = (url, params = {}) => axios.get(url, params);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get
};
