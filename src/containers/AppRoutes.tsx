import React from 'react';
import { useRoutes } from 'react-router-dom';

const Home = React.lazy(async () => await import('../components/Home'));
const Calender = React.lazy(async () => await import('../components/Calender/Calender'));
const Signup = React.lazy(async () => await import('../components/Signup'));
const Login = React.lazy(async () => await import('../components/Login'));
const NotFound = React.lazy(async () => await import('../components/NotFound'));

const Routes = (): any => {
  const routes = useRoutes([
    { path: '/', element: <Home />, children: [] },
    { path: '/calender', element: <Calender />, children: [] },
    { path: '/signup', element: <Signup />, children: [] },
    { path: '/login', element: <Login />, children: [] },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
};

export default Routes;
