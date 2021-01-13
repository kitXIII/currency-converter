import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        },
        display: 'flex',
        justifyContent: 'space-between'
    },
    column: {
        width: '40%'
    },
    formControl: {
        'width': '100%',
        '& + &': {
            paddingTop: theme.spacing(2)
        }
    },
    input: {
        fontSize: '24px'
    }
}));

export default useStyles;
