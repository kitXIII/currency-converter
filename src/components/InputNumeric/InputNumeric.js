import { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AutoNumeric from 'autonumeric';

import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import set from 'lodash/set';
import noop from 'lodash/noop';

import useNode from 'utils/useNode';
import { CURRENCY_SYMBOLS, VALUE_PRECISION } from 'constants/index';

import useStyles from './useStyles';

const DEFAULT_TYPE = 'text';

const OPTIONS = {
    currencySymbolPlacement: 's',
    digitGroupSeparator: ' ',
    allowDecimalPadding: true,
    emptyInputBehavior: 'null',
    minimumValue: 0,
    decimalPlaces: VALUE_PRECISION,
    decimalPlacesRawValue: VALUE_PRECISION
};

const InputNumeric = (props) => {
    const styles = useStyles();

    const options = useMemo(() => {
        const currencySymbol = CURRENCY_SYMBOLS[props.currency];
        return currencySymbol ? { ...OPTIONS, currencySymbol } : OPTIONS;
    }, [props.currency]);

    const [inputFieldNumeric, setInputFieldNumeric] = useState(null);
    const [inputField, inputFieldRef] = useNode();

    useEffect(() => {
        if (inputField && isNull(inputFieldNumeric)) {
            setInputFieldNumeric(new AutoNumeric(inputField, options));
        }
        return () => {
            inputFieldNumeric && inputFieldNumeric.remove();
        };
    }, [inputField, inputFieldNumeric, options]);

    useEffect(() => {
        if (!isNull(inputFieldNumeric) && !isNil(props.value) && props.value !== inputFieldNumeric.getFormatted()) {
            inputFieldNumeric.set(props.value);
        }
    }, [inputFieldNumeric, props.value]);

    const onChange = useCallback(
        (e) => {
            const value = inputFieldNumeric.getFormatted();
            set(e, 'target.value', value);
            props.onChange(e);
        },
        [inputFieldNumeric, props]
    );

    const onBlur = useCallback(
        (e) => {
            const value = inputFieldNumeric.getFormatted();
            inputFieldNumeric.set(value);
            set(e, 'target.value', value);
            set(e, 'target.name', props.name);
            props.onBlur(e);
        },
        [inputFieldNumeric, props]
    );

    return (
        <div
            className={`MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl ${styles.input}`}
        >
            <input
                ref={inputFieldRef}
                className='MuiInputBase-input MuiInput-input'
                placeholder={props.placeholder}
                onChange={onChange}
                onBlur={onBlur}
                disabled={props.disabled}
                readOnly={props.readOnly}
                id={props.id}
                name={props.name}
                maxLength={props.maxLength}
                required={props.required}
                type={DEFAULT_TYPE}
                autoComplete='off'
            />
        </div>
    );
};

InputNumeric.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    name: PropTypes.string,
    maxLength: PropTypes.string,
    required: PropTypes.bool,
    currency: PropTypes.string
};

InputNumeric.defaultProps = {
    className: '',
    placeholder: '',
    value: '',
    onChange: noop,
    onBlur: noop
};

export default InputNumeric;
