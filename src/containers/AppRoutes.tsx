import React from 'react';
import { useRoutes } from 'react-router-dom';

const Home = React.lazy(async () => await import('../components/Home'));
const Calender = React.lazy(async () => await import('../components/Calender/Calender'));
const NotFound = React.lazy(async () => await import('../components/NotFound'));

const Routes = (): any => {
  const routes = useRoutes([
    { path: '/', element: <Home />, children: [] },
    { path: '/calender', element: <Calender />, children: [] },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
};

export default Routes;
