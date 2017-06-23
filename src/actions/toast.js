import {
  TOAST_OPEN,
  TOAST_CLOSE,
} from './ActionTypes';


/*============================================================================
 TOAST
 ==============================================================================*/

/* OPEN */
export function toastOpen(content, time) {
  return {
    type: TOAST_OPEN,
    content,
    time,
  };
}

/* CLOSE */
export function toastClose() {
  return {
    type: TOAST_CLOSE,
  }
}

