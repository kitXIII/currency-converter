// eslint-disable-next-line import/no-anonymous-default-export
export default (value, digits) => {
    return Math.round(value * `1e${digits}`) / `1e${digits}`;
};
