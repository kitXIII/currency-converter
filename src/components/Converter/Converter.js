import { useMemo, useEffect, useRef, useState } from 'react';

import get from 'lodash/get';
import keys from 'lodash/keys';
import isString from 'lodash/isString';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SwapVertIcon from '@material-ui/icons/SwapVert';

import { useSelector, useDispatch, actions } from 'store';
import InputNumeric from 'components/InputNumeric/InputNumeric';
import selectStatusHelper from 'utils/statuses';

import useStyles from './useStyles';

const latestRequestStatusSelector = (state) => state.getLatestRequestStatus;

const App = () => {
    const styles = useStyles();

    const lastRequestedSymbolFrom = useRef();
    const lastRequestedSymbolTo = useRef();

    const dispatch = useDispatch();
    const latestRequestStatus = useSelector(selectStatusHelper(latestRequestStatusSelector));

    const symbolFrom = useSelector((state) => state.symbolFrom);
    const symbolTo = useSelector((state) => state.symbolTo);
    const valueFrom = useSelector((state) => state.valueFrom);
    const valueTo = useSelector((state) => state.valueTo);

    const symbols = useSelector((state) => state.symbols);
    const symbolsFrom = symbols.filter((s) => s !== symbolTo);
    const symbolsTo = symbols.filter((s) => s !== symbolFrom);

    const handleSelectFromSymbol = (e) => dispatch(actions.setSymbolFrom(e.target.value));
    const handleSelectToSymbol = (e) => dispatch(actions.setSymbolTo(e.target.value));
    const handleChangeToValue = (e) => dispatch(actions.setValueTo(e.target.value));
    const handleChangeSymbols = () => dispatch(actions.changeSymbols());

    const handleChangeFromValue = (e) => dispatch(actions.setValueFrom(e.target.value));


    const latestRates = useSelector((state) => state.latestRates);
    const ratioSymbolFrom = useMemo(() => get(latestRates, 'base', null), [latestRates]);
    const rates = useMemo(() => get(latestRates, 'rates', {}), [latestRates]);
    const ratioSymbolTo = useMemo(() => keys(rates).find((key) => key !== ratioSymbolFrom), [rates, ratioSymbolFrom]);

    useEffect(() => {
        if (lastRequestedSymbolFrom.current === symbolFrom && lastRequestedSymbolTo.current === symbolTo) {
            return;
        }

        if (latestRequestStatus.isPending) {
            return;
        }

        lastRequestedSymbolFrom.current = symbolFrom;
        lastRequestedSymbolTo.current = symbolTo;

        dispatch(actions.getLatestForSymbols({ from: symbolFrom, to: symbolTo }));
    }, [dispatch, symbolFrom, latestRequestStatus, symbolTo]);

    const error = useSelector((state) => state.getLatestRequestError);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        if (!error) {
            return setErrorMessage(null);
        }

        if (!error.response) {
            return setErrorMessage('Network connection problem');
        }

        if (error.response.data?.error && isString(error.response.data.error)) {
            setErrorMessage(error.response.data.error);
        }
    }, [error]);

    return (
        <>
            <Paper className={styles.paper}>
                <div className={styles.column}>
                    <FormControl className={styles.formControl}>
                        <InputLabel id='from-select-label'>From</InputLabel>
                        <Select
                            labelId='from-select-label'
                            id='from-select'
                            value={symbolFrom}
                            onChange={handleSelectFromSymbol}
                            disabled={latestRequestStatus.isPending}
                        >
                            {symbolsFrom.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputNumeric
                            value={valueFrom}
                            onChange={handleChangeFromValue}
                            disabled={latestRequestStatus.isPending}
                        />
                    </FormControl>
                </div>
                <Fab
                    className={styles.button_first}
                    aria-label='change symbols'
                    variant='extended'
                    onClick={handleChangeSymbols}
                >
                    <SwapHorizIcon />
                </Fab>
                <div className={styles.column}>
                    <FormControl className={styles.formControl}>
                        <InputLabel id='to-select-label'>To</InputLabel>
                        <Select
                            labelId='to-select-label'
                            id='to-select'
                            value={symbolTo}
                            onChange={handleSelectToSymbol}
                            disabled={latestRequestStatus.isPending}
                        >
                            {symbolsTo.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputNumeric
                            value={valueTo}
                            onChange={handleChangeToValue}
                            disabled={latestRequestStatus.isPending}
                        />
                    </FormControl>
                </div>
            </Paper>
            <Fab className={styles.button_second} aria-label='change symbols' onClick={handleChangeSymbols}>
                <SwapVertIcon />
            </Fab>
            {errorMessage && (
                <Alert severity='error'>
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            )}
        </>
    );
};

export default App;
