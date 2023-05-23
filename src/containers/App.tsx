import React, { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import theme from '../theme';
import Routes from './AppRoutes';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
