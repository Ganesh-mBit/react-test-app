import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { isEmpty } from 'lodash';
import {
  FormControl,
  TextField,
  InputAdornment,
  Box,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LabelDescriptionField from './LabelDescriptionField';

interface FormInputTextFieldProps {
  name: string
  control: any
  label?: string
  sideLabel?: string
  placeholder?: string
  errorMessage?: string
  hideErrorField?: boolean
  size?: string
  type?: string
  width?: string | number
  maxLen?: number
  password?: boolean
  disabled?: boolean
  autoComplete?: string
  prefix?: string
  showPrefix?: boolean
  onBlur?: () => void
  onFocus?: () => void
}

const FormInputTextField: React.FC<FormInputTextFieldProps> = (props): JSX.Element => {
  const {
    name,
    control,
    label,
    sideLabel,
    placeholder,
    errorMessage,
    hideErrorField,
    type,
    width,
    maxLen,
    password,
    disabled,
    // autoComplete,
    prefix,
    showPrefix,
    onBlur,
    onFocus
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent): void => {
    event.preventDefault();
  };

  // eslint-disable-next-line
  const regEx = new RegExp('/[^0-9]*.?[^0-9]*$/');

  const allowOnlyNumbers = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event?.key?.length === 1 && regEx.test(event?.key)) {
      event?.preventDefault();
    }
  };

  return (
    <Box>
      <LabelDescriptionField
        label={label}
        sideLabel={sideLabel}
      />
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { error }
        }) => (
          <FormControl sx={{ width: { width } }}>
            <TextField
              id={name}
              variant="outlined"
              error={!!error || !!errorMessage}
              type={password && !showPassword ? 'password' : type ?? 'text'}
              fullWidth
              placeholder={placeholder}
              onChange={(e) => { onChange(maxLen && e.target.value.length > maxLen ? e.target.value.slice(0, maxLen) : e.target.value); }}
              onBlur={onBlur}
              onKeyPress={(e) => { type === 'number' && allowOnlyNumbers(e); }}
              value={value}
              inputRef={ref}
              onFocus={onFocus}
              helperText={!hideErrorField ? error ? error.message : (!isEmpty(errorMessage) ? errorMessage : ' ') : ''}
              {...(password ? { autoComplete: 'new-password' } : {})}
              disabled={disabled}
              InputProps={{
                startAdornment: (showPrefix && (
                  <InputAdornment position="start">
                    {prefix}
                  </InputAdornment>
                )),
                endAdornment: (password && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )),
                inputProps: {
                  ...(type === 'number') && { inputMode: 'numeric', pattern: '[0-9]*' }
                }
              }}
            />
          </FormControl>
        )}
      />
    </Box>
  );
};

FormInputTextField.defaultProps = {
  label: '',
  width: '',
  prefix: '',
  type: '',
  autoComplete: 'on',
  placeholder: '',
  size: undefined,
  sideLabel: '',
  errorMessage: '',
  password: false,
  disabled: false,
  showPrefix: false,
  hideErrorField: false,
  maxLen: 0,
  onBlur: () => { },
  onFocus: () => { }
};

export default FormInputTextField;
