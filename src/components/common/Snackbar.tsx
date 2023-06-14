import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { setErrorMessage, setSuccessMessage } from '../../redux/actions/appActions';

const CustomSnackbar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { errorMessage, successMessage } = useSelector((state: any) => state.app);

  const handleClose = (): void => {
    if (errorMessage) {
      dispatch(setErrorMessage(''));
    } else {
      dispatch(setSuccessMessage(''));
    }
  };

  if (successMessage) {
    return (
      <Snackbar open={!!successMessage} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    );
  } else if (errorMessage) {
    return (
      <Snackbar open={!!errorMessage} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    );
  } else return <></>;
};

export default CustomSnackbar;
