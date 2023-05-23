import React from 'react';
import { useRoutes } from 'react-router-dom';

const Home = React.lazy(async () => await import('../components/Home'));
const NotFound = React.lazy(async () => await import('../components/NotFound'));

const Routes = (): any => {
  const routes = useRoutes([
    { path: '/', element: <Home />, children: [] },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
};

export default Routes;
