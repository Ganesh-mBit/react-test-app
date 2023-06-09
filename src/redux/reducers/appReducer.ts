// import { SET_USER } from '../actions/actionTypes';
import initialState from './initialState';

export default function appReducer (currentState: object, action: { type: string, payload: any }): any {
  const state = currentState || initialState.app;
  switch (action.type) {
    // case SET_USER:
    //   return { ...state, user: action.payload };
    default:
      return state;
  }
}
