import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, API } from 'react-package-bt';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInputTextField from './common/FormInputTextField';
import { USER_LOGIN_URL } from '../redux/api/config';
import { Box, Typography } from '@mui/material';
import { setErrorMessage, setSuccessMessage } from '../redux/actions/appActions';

export const ForgotPasswordSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required.')
    .email('Invalid email address.')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+$/, 'Invalid email address.')
});

const ForgotPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    username: ''
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
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
      console.log(data);
      dispatch(API(USER_LOGIN_URL, 'POST', data, onSuccess, onError));
    }
  };

  return (
    <Form
      title='Forgot Password'
      logoUrl='https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=180&h=250&dpr=2'
      formSx={{ width: { xs: '90%', md: '30%' }, gap: 4 }}
      error={errorMsg}
      fields={[
        {
          label: '',
          sxField: { grid: { xs: 12, md: 12 } },
          type: 'component',
          component: (
            <Box textAlign="center" pb={3}>
              <Typography variant="body1" color="gray">Enter your registered email to receive password reset instructions.</Typography>
            </Box>
          )
        },
        {
          label: 'Email',
          sxField: { grid: { xs: 12, md: 12 } },
          type: 'component',
          component: <FormInputTextField width="100%" name='username' control={control} errorMessage={errors.username?.message} placeholder='Enter Email' />
        }
      ]}
      showSocialLogin={false}
      showForgotPassword={false}
      socialProviders={['facebook', 'google', 'twitter']}
      onSocialLogin={() => { }}
      buttonLabel='Send Email'
      buttonXS={{ width: '100%', fontSixe: '24px', fontWeight: 'bold', fill: 'secondary' }}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
};

export default ForgotPassword;
