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
import { setErrorMessage, setSuccessMessage } from '../redux/actions/appActions';
import OTPInputField from './common/OTPInputField';

export const ForgotPasswordSchema = Yup.object().shape({
  currentOTP: Yup.string()
    .required('Verification Code is required.'),
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

  const defaultValues = {
    currentOTP: '',
    password: '',
    confirmPassword: ''
  };

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues,
    resolver: yupResolver(ForgotPasswordSchema),
    reValidateMode: 'onChange'
  });

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
                <BODY1 color="gray">Enter Verification Code</BODY1>
                <OTPInputField name='currentOTP' control={control} error={errors.currentOTP?.message ?? ''} />
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
