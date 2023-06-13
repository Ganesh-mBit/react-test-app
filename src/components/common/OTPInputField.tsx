import React from 'react';
import { Box } from '@mui/material';
import OTPInput from 'react-otp-input';

type SXProps = Record<string, string>;

interface OTPInputFieldProps {
  value: string
  setValue: any
  numInputs?: number
  mainSX?: SXProps
  inputStyleCSS?: SXProps
}

const OTPInputField: React.FC<OTPInputFieldProps> = ({
  value,
  setValue,
  numInputs,
  mainSX,
  inputStyleCSS
}) => {
  const handleOnChange = (value: string): void => {
    setValue(value);
  };

  return (
    <Box sx={{ ...mainSX }}>
      <OTPInput
        value={value}
        inputStyle={{ width: '3rem', height: '3rem', marginRight: '1rem', borderRadius: '4px', border: '1px solid #e8e8ed', ...inputStyleCSS }}
        onChange={handleOnChange}
        numInputs={numInputs ?? 4}
        renderInput={(props) => <input {...props} />}
      />
    </Box>
  );
};

export default OTPInputField;
