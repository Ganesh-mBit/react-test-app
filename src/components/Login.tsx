import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, login } from 'react-package-bt';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInputTextField from './common/FormInputTextField';
// import { Form } from '../components/LoginForm';
import { Box, Button, Typography } from '@mui/material';
import { USER_LOGIN_URL } from '../redux/api/config';
import { useNavigate } from 'react-router-dom';
import { setErrorMessage, setSuccessMessage } from '../redux/actions/appActions';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required.')
    .email('Enter Valid Email')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+$/, 'Invalid email address.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
});

const LoginMain = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    username: '',
    password: ''
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
    reValidateMode: 'onChange'
  });

  const onSuccess = (res: any): void => {
    dispatch(setSuccessMessage(res?.message));
    const { accessToken, refreshToken } = res?.result;
    localStorage.setItem('jwt_access_token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    navigate('/');
  };

  const onError = (error: any): void => {
    setErrorMsg(error?.errorMsg);
    dispatch(setErrorMessage(error?.message));
  };

  const onSubmit = (data: any): void => {
    localStorage.removeItem('jwt_access_token');
    localStorage.removeItem('refreshToken');
    if (data) {
      dispatch(login(USER_LOGIN_URL, data, onSuccess, onError));
    }
  };

  return (
    <Form
      title='Welcome Back'
      logoUrl='https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=180&h=250&dpr=2'
      formSx={{ width: { xs: '90%', md: '30%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
      error={errorMsg}
      fields={[
        {
          label: 'Email',
          sxField: { grid: { xs: 12, md: 12 } },
          type: 'component',
          component: <FormInputTextField width="100%" name='username' control={control} errorMessage={errors.username?.message} placeholder='Enter Email' />
        },
        {
          label: 'Password',
          sxField: { grid: { xs: 12, md: 12 } },
          type: 'component',
          component: <FormInputTextField width="100%" name='password' control={control} password placeholder='Enter Password' />
        }
      ]}
      showSocialLogin={true}
      showForgotPassword={true}
      socialProviders={['facebook', 'google', 'twitter']}
      onSocialLogin={() => { console.log('Social Login'); }}
      onForgotPassword={() => { navigate('/password'); }}
      buttonLabel='Log In'
      buttonXS={{ width: '100%', fontSixe: '24px', fontWeight: 'bold', fill: 'secondary' }}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      slotProps={(
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Typography variant="body1">Don&apos;t have an account?</Typography>
          <Button onClick={() => { navigate('/signup'); }} color="primary">
            Create an Account
          </Button>
        </Box>
      )}
    />
  );
};

export default LoginMain;
