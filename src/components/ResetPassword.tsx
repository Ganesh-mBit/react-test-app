import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, API } from 'react-package-bt';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInputTextField from './common/FormInputTextField';
import { USER_LOGIN_URL } from '../redux/api/config';
import { Box, Divider, Typography } from '@mui/material';
import { BODY1 } from './common/Typography';
import OTPInput from 'react-otp-input';
import { setErrorMessage, setSuccessMessage } from '../redux/actions/appActions';

export const ForgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.'),
  confirmPassword: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .oneOf([Yup.ref('password')], 'Password did not match.')
});

const ResetPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [currentOtp, setCurrentOtp] = useState('');

  const defaultValues = {
    password: '',
    confirmPassword: ''
  };

  const {
    handleSubmit,
    control
  } = useForm({
    defaultValues,
    resolver: yupResolver(ForgotPasswordSchema),
    reValidateMode: 'onChange'
  });

  const handleChangeOtp = (value: string): void => {
    setCurrentOtp(value);
  };

  const onSuccess = (res: any): void => {
    dispatch(setSuccessMessage(res?.message));
  };

  const onError = (error: any): void => {
    setErrorMsg(error?.errorMsg);
    dispatch(setErrorMessage(error?.errorMsg));
  };

  const onSubmit = (data: any): void => {
    if (data) {
      dispatch(API(USER_LOGIN_URL, 'POST', data, onSuccess, onError));
    }
  };

  return (
    <Form
      title='Create a New Password'
      formSx={{ width: { xs: '90%', md: '30%' }, gap: 4 }}
      error={errorMsg}
      fields={[
        {
          label: '',
          sxField: { grid: { xs: 12, md: 12 } },
          type: 'component',
          component: (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body1" color="gray">
                Enter the code that was sent to your <br />
                registered email and create a new password.
              </Typography>
            </Box>
          )
        },
        {
          label: '',
          sxField: { grid: { xs: 12, md: 12 } },
          type: 'component',
          component: (
            <>
              <Divider />
              <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <BODY1>Enter Verification Code</BODY1>
                <OTPInput
                  value={currentOtp}
                  inputStyle={{
                    width: '3rem', height: '3rem', marginRight: '1rem', borderRadius: '4px', border: '1px solid #e8e8ed'
                  }}
                  onChange={handleChangeOtp}
                  numInputs={4}
                  renderInput={(props) => <input {...props} />}
                />
              </Box>
              <Divider />
            </>
          )
        },
        {
          label: 'Password',
          type: 'component',
          sxField: { grid: { xs: 12, md: 12 } },
          component: <FormInputTextField width="100%" name='password' control={control} password placeholder='Enter Password' />
        },
        {
          label: 'Confirm Password',
          type: 'component',
          sxField: { grid: { xs: 12, md: 12 } },
          component: <FormInputTextField width="100%" name='confirmPassword' control={control} password placeholder='Enter Password' />
        }
      ]}
      showSocialLogin={false}
      showForgotPassword={false}
      socialProviders={['facebook', 'google', 'twitter']}
      onSocialLogin={() => { }}
      buttonLabel='Reset Password'
      buttonXS={{ width: '100%', fontSixe: '24px', fontWeight: 'bold', fill: 'secondary' }}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
};

export default ResetPassword;
