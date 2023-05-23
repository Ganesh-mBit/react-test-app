import React from 'react';
// import Login from './Login';
import Login from './LoginForm';

const App = (): JSX.Element => {
  // const fields = [
  //   { name: 'username', label: 'Username', type: 'text', required: true },
  //   { name: 'password', label: 'Password', type: 'password', required: true },
  //   { name: 'email', label: 'Email', type: 'email', required: true }
  //   // Add more fields as needed
  // ];

  const loginProps = {
    title: 'Welcome',
    logoUrl: 'data:image/jpeg;base64,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',
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true }
      // {
      //   name: 'phone',
      //   label: 'Phone',
      //   type: 'tel',
      //   required: true
      // },
      // {
      //   name: 'otp',
      //   label: 'OTP',
      //   type: 'text',
      //   required: true
      // }
    ],
    // error: 'Invalid credentials',
    showSocialLogin: true,
    showForgotPassword: true,
    showCreateAccount: true,
    onSocialLogin: (provider: string) => {
      // Handle social login
    },
    onForgotPassword: () => {
      // Handle forgot password
    },
    onCreateAccount: () => {
      // Handle create account
    },
    onSubmit: (data: any) => {
      console.log(data);
    },
    socialProviders: ['facebook', 'google', 'twitter']
    // customForm: (
    //   <form>
    //     <label>Custom Field 1</label>
    //     <input type="text" />
    //     <label>Custom Field 2</label>
    //     <input type="password" />
    //   </form>
    // )
  };

  return <Login {...loginProps} />;
  // return <LoginForm {...loginProps} />;
  // return <Login fields={fields} title="Login Form" logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-cNcmhV5lQ7BMrUdC2xPHv0zvTeAfVpkIQ&usqp=CAU" />;
};

export default App;
