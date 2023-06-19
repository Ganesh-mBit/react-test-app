import React, { useState } from 'react';
import LabelDescriptionField from './LabelDescriptionField';
import { Box, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface FormDateFieldProps {
  name: string
  control: any
  label?: string
  sideLabel?: string
  width?: string | number
  minDate?: any
  maxDate?: any
  readOnly?: boolean
  disabled?: boolean
}

const FormDateField: React.FC<FormDateFieldProps> = (props): JSX.Element => {
  const {
    label,
    name,
    control,
    sideLabel,
    width,
    minDate,
    maxDate,
    readOnly,
    disabled
  } = props;

  const [popperState, setPopperState] = useState(false);

  return (
    <Box width="100%">
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
          <FormControl sx={{ width: { width } }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                open={popperState}
                value={value}
                onOpen={() => {
                  if (!disabled) {
                    setPopperState(true);
                  }
                }}
                onClose={(): void => { setPopperState(false); }}
                onChange={popperState ? () => null : onChange}
                onAccept={(newValue) => {
                  if (popperState) {
                    onChange(newValue);
                  }
                }}
                disabled={disabled}
                readOnly={readOnly}
                maxDate={maxDate}
                minDate={minDate}
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    error: !!error?.message
                  }
                }}
              />
            </LocalizationProvider>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default FormDateField;

FormDateField.defaultProps = {
  label: '',
  sideLabel: '',
  width: '',
  minDate: undefined,
  maxDate: undefined,
  readOnly: false,
  disabled: false
};
