import * as types from './actionTypes';

export function beginAjaxCall (): { type: string } {
  return { type: types.BEGIN_AJAX_CALL };
}

export function endAjaxCall (): { type: string } {
  return { type: types.END_AJAX_CALL };
}

export function ajaxCallError (): { type: string } {
  return { type: types.AJAX_CALL_ERROR };
}

export function clearAjaxCall (): { type: string } {
  return { type: types.AJAX_CALL_CLEAR };
}
