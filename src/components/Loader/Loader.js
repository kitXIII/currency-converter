import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './useStyles';

const Loader = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <CircularProgress />
        </div>
    );
};

export default Loader;
