import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up(680)]: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    column: {
        width: '40%',
        [theme.breakpoints.down(680)]: {
            width: '100%',
            paddingBottom: theme.spacing(2)
        }
    },
    formControl: {
        'width': '100%',
        'paddingBottom': theme.spacing(1),
        '& + &': {
            paddingTop: theme.spacing(2)
        }
    },
    input: {
        fontSize: '24px'
    },
    button_first: {
        'marginTop': theme.spacing(1),
        'boxShadow': 'none',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'transparent'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'transparent'
        },
        'backgroundColor': 'transparent',
        [theme.breakpoints.down(680)]: {
            display: 'none'
        }
    },
    button_second: {
        boxShadow: 'none',
        alignSelf: 'flex-end',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up(680)]: {
            display: 'none'
        }
    },
    date: {
        fontSize: 14,
        textAlign: 'right',
        paddingTop: theme.spacing(1)
    },
    info: {
        fontSize: 14,
        textAlign: 'left',
        paddingTop: theme.spacing(1)
    }
}));

export default useStyles;
