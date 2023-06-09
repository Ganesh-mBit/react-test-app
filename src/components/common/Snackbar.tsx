import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { setErrorMessage } from '../../redux/actions/appActions';

const CustomSnackbar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { errorMessage, successMessage } = useSelector((state: any) => state.app);

  const handleClose = (): void => {
    if (errorMessage) {
      dispatch(setErrorMessage(''));
    } else {
      dispatch(setErrorMessage(''));
    }
  };

  return (
    <div>
      <Snackbar open={!!errorMessage || !!successMessage} autoHideDuration={5000} onClose={handleClose}>
        <>
          {errorMessage
            ? (
              <Alert variant='filled' onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>)
            : successMessage && (
              <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {successMessage}
              </Alert>
            )}
        </>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
