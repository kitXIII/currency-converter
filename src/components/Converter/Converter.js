import { useMemo, useEffect, useRef, useState } from 'react';

import get from 'lodash/get';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isString';

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
import { VALUE_PRECISION } from 'constants/index';

import useStyles from './useStyles';

const latestRequestStatusSelector = (state) => state.getLatestRequestStatus;

const canBeParsed = (value) => isString(value) && value.trim() !== '';

const roundByPrecision = (value, digits) => Math.round(value * `1e${digits}`) / `1e${digits}`;

const App = () => {
    const styles = useStyles();

    const lastRequestedSymbolFrom = useRef();

    const lastParsedValueFrom = useRef();
    const lastParsedValueTo = useRef();
    const lastRatio = useRef();

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
    const ratio = useMemo(() => rates[symbolTo], [rates, symbolTo]);

    const conversionAllowed = useMemo(() => ratioSymbolFrom === symbolFrom && !isEmpty(ratio), [ratio, ratioSymbolFrom, symbolFrom]);

    useEffect(() => {
        if (lastRequestedSymbolFrom.current === symbolFrom) {
            return;
        }

        if (latestRequestStatus.isPending) {
            return;
        }

        lastRequestedSymbolFrom.current = symbolFrom;

        dispatch(actions.getLatestForBaseSymbol(symbolFrom));
    }, [dispatch, symbolFrom, latestRequestStatus, symbolTo]);

    useEffect(() => {
        if (!conversionAllowed) {
            return;
        }

        const parsedValueFrom = canBeParsed(valueFrom) ? parseFloat(valueFrom.replace(/\s/g, '')) : 0;
        const parsedValueTo = canBeParsed(valueTo) ? parseFloat(valueTo.replace(/\s/g, '')) : 0;

        if (parsedValueFrom !== lastParsedValueFrom.current || ratio !== lastRatio.current) {
            lastParsedValueFrom.current = parsedValueFrom;
            lastRatio.current = ratio;

            const convertedValueTo = roundByPrecision(parsedValueFrom * ratio, VALUE_PRECISION);

            lastParsedValueTo.current = convertedValueTo;
            dispatch(actions.setValueTo(`${convertedValueTo}`));

            return;
        }

        if (parsedValueTo !== lastParsedValueTo.current) {
            lastParsedValueTo.current = parsedValueTo;

            const convertedValueFrom = roundByPrecision(parsedValueTo / ratio, VALUE_PRECISION);

            lastParsedValueFrom.current = convertedValueFrom;
            dispatch(actions.setValueFrom(`${convertedValueFrom}`));
        }

    }, [conversionAllowed, dispatch, ratio, valueFrom, valueTo]);

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
