import React from 'react';
import { Login, login } from 'react-package-bt';
import { useDispatch } from 'react-redux';

const LoginMain = (): JSX.Element => {
  const dispatch = useDispatch();

  const onSubmit = (data: any): void => {
    if (data) {
      dispatch(login('https://api.gamestoppedout.com/auth/v1.0/login', data, () => { alert('Signup successful'); }, () => { alert('Opps Something went wrong!'); }));
    }
  };

  return (
    <Login
      title='Log In'
      logoUrl='https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=180&h=250&dpr=2'
      formSx={{ width: { xs: '90%', md: '40%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
      fields={[
        { name: 'username', label: 'Username', type: 'text', required: true, sxField: { grid: { xs: 12, md: 12 } } },
        { name: 'password', label: 'Password', type: 'password', required: true, sxField: { grid: { xs: 12, md: 12 } } }
      ]}
      showSocialLogin={true}
      showCreateAccount={true}
      showForgotPassword={false}
      socialProviders={['facebook', 'google', 'twitter']}
      onSocialLogin={() => { console.log('Social Login'); }}
      onForgotPassword={() => { console.log('Forgot Password'); }}
      onCreateAccount={() => { console.log('Create New Account'); }}
      onSubmit={onSubmit}
    />
  );
};

export default LoginMain;
