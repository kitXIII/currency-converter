import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import useStyles from './useStyles';

const Layout = ({ children }) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <CssBaseline />
            <AppBar position='static'>
                <Typography variant='h5' component='h1' className={styles.title}>
                    Currency converter
                </Typography>
            </AppBar>
            <Container className={styles.layout}>
                {children}
            </Container>
        </div>
    );
}

export default Layout;
