import React, { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import theme from '../theme';
import Routes from './AppRoutes';
import CustomSnackbar from '../components/common/Snackbar';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes />
        <CustomSnackbar />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
