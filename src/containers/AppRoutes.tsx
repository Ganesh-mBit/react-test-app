import React from 'react';
import { useRoutes } from 'react-router-dom';

const Home = React.lazy(async () => await import('../components/Home'));
const Calender = React.lazy(async () => await import('../components/Calender/CustomCalender'));
const Signup = React.lazy(async () => await import('../components/Signup'));
const Login = React.lazy(async () => await import('../components/Login'));
const ForgotPassword = React.lazy(async () => await import('../components/ForgotPassword'));
const ResetPassword = React.lazy(async () => await import('../components/ResetPassword'));
const EditProfile = React.lazy(async () => await import('../components/EditProfile'));
const NotFound = React.lazy(async () => await import('../components/NotFound'));

const Routes = (): any => {
  const routes = useRoutes([
    { path: '/', element: <Home />, children: [] },
    { path: '/calender', element: <Calender />, children: [] },
    { path: '/signup', element: <Signup />, children: [] },
    { path: '/login', element: <Login />, children: [] },
    { path: '/password', element: <ForgotPassword />, children: [] },
    { path: '/password/reset', element: <ResetPassword />, children: [] },
    { path: '/user/profile', element: <EditProfile />, children: [] },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
};

export default Routes;
