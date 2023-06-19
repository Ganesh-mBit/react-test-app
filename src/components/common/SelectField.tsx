import * as React from 'react';
import { Controller } from 'react-hook-form';
import { isEmpty } from 'lodash';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LabelDescriptionField from './LabelDescriptionField';

interface SelectFieldProps {
  name: string
  control: any
  label?: string
  sideLabel?: string
  width?: string | number
  optionsSX?: React.CSSProperties
  errorMessage?: string
  options: any
  disableKeys?: any
  disabled?: boolean
  autoFocus?: boolean
  autoComplete?: string
  customFunction?: (() => void) | undefined
}

const getStyles = (optionSX: any): any => {
  return {
    ...optionSX
  };
};

const SelectField: React.FC<SelectFieldProps> = (props): JSX.Element => {
  const {
    name,
    label,
    sideLabel,
    width,
    optionsSX,
    errorMessage,
    // placeholder,
    options,
    control,
    disabled,
    autoFocus,
    customFunction,
    autoComplete,
    disableKeys
  } = props;

  return (
    <div>
      <LabelDescriptionField
        label={label}
        sideLabel={sideLabel}
      />
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error }
        }) => (
          <FormControl sx={{ width: { width } }} disabled={disabled} error={!!error || !!errorMessage}>
            <Select
              displayEmpty
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value);
                if (customFunction) {
                  customFunction();
                }
              }}
              autoComplete={autoComplete}
              input={(
                <OutlinedInput
                  autoFocus={autoFocus}
                />
              )}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {options.map((item: { key: string, value: string }) => (
                <MenuItem
                  key={item.key}
                  value={item.key}
                  style={getStyles(optionsSX)}
                  disabled={disableKeys.includes(item.key)}
                >
                  {item.value}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error ? error.message : (!isEmpty(errorMessage) ? errorMessage : ' ')}</FormHelperText>
          </FormControl>
        )}
      />
    </div>
  );
};

SelectField.defaultProps = {
  autoComplete: '',
  optionsSX: {},
  options: [],
  label: '',
  sideLabel: '',
  errorMessage: '',
  width: '',
  disabled: false,
  autoFocus: false,
  customFunction: () => { },
  disableKeys: []
};

export default SelectField;
