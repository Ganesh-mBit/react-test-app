import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function ajaxStatusReducer (currentState: number, action: any): number {
  const state = currentState || initialState.ajaxCallsInProgress;
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  }
  if (action.type === types.AJAX_CALL_ERROR) {
    return state > 0 ? state - 1 : 0;
  }
  if (action.type === types.END_AJAX_CALL) {
    return state > 0 ? state - 1 : 0;
  }
  if (action.type === types.AJAX_CALL_CLEAR) {
    return 0;
  }
  return state;
}
