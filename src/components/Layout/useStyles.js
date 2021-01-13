import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f5f5f5',
        height: '100vh'
    },
    layout: {
        height: 'calc(100vh - 56px)',
        backgroundColor: 'transparent',
        paddingTop: theme.spacing(4)
    },
    title: {
        padding: theme.spacing(2)
    }
}));

export default useStyles;
