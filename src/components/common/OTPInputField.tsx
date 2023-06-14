import React from 'react';
import { Box, FormHelperText } from '@mui/material';
import OTPInput from 'react-otp-input';
import { Controller } from 'react-hook-form';

type SXProps = Record<string, string>;

interface OTPInputFieldProps {
  name: string
  control: any
  error: string
  numInputs?: number
  mainSX?: SXProps
  inputStyleCSS?: SXProps
}

const OTPInputField: React.FC<OTPInputFieldProps> = ({
  name,
  control,
  error,
  numInputs,
  mainSX,
  inputStyleCSS
}): JSX.Element => {
  return (
    <Box sx={{ ...mainSX }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OTPInput
            {...field}
            inputStyle={{ width: '3rem', height: '3rem', marginRight: '1rem', borderRadius: '4px', border: '1px solid #e8e8ed', ...inputStyleCSS }}
            onChange={(value) => { field.onChange(value); }}
            numInputs={numInputs ?? 4}
            renderInput={(props) => <input {...props} />}
          />
        )}
      />
      <FormHelperText sx={{ py: 1 }} error>{error}</FormHelperText>
    </Box>
  );
};

export default OTPInputField;
