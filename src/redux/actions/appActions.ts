import API_MIDDLEWARE from '../api/middleware';
import { SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE, SET_USER } from './actionTypes';
import { beginAjaxCall, endAjaxCall } from './ajaxStatusActions';

export const setErrorMessage = (payload: any): any => {
  return { type: SET_ERROR_MESSAGE, payload };
};

export const setSuccessMessage = (payload: any): any => {
  return { type: SET_SUCCESS_MESSAGE, payload };
};

export const setUser = (payload: any): any => {
  return { type: SET_USER, payload };
};

export const login = (data: any): any => {
  return (dispatch: any) => {
    dispatch(beginAjaxCall());
    API_MIDDLEWARE(
      'https://api.gamestoppedout.com/auth/v1.0/login',
      'POST',
      {
        'Content-Type': 'application/json'
      },
      data
    )
      .then((res) => {
        dispatch(endAjaxCall());
        dispatch(setUser(res));
      })
      .catch((err) => {
        dispatch(endAjaxCall());
        dispatch(setErrorMessage(err?.errorMsg));
      });
  };
};
