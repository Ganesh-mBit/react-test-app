import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appReducer (currentState: object, action: { type: string, payload: any }): any {
  const state = currentState || initialState.app;
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: action.payload };

    case types.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload
      };

    case types.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
}
