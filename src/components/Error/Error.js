import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ReplayIcon from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';

import useStyles from './useStyles';

const clickButtonHandler = () => document.location.reload();

const Error = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Box className={styles.box}>
                <Typography className={styles.title} variant='h5' component='p'>
                    Something went wrong. Please try later.
                </Typography>
                <Fab
                    className={styles.button}
                    aria-label='reload'
                    variant='extended'
                    onClick={clickButtonHandler}
                >
                    <ReplayIcon />
                </Fab>
            </Box>
        </div>
    );
};

export default Error;
