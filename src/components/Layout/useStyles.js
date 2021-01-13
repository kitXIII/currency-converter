import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f5f5f5',
        height: '100vh'
    },
    layout: {
        height: 'calc(100vh - 56px)',
        backgroundColor: 'transparent',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        padding: theme.spacing(2)
    }
}));

export default useStyles;
