import {
  CONFIRM_OPEN,
  CONFIRM_CLOSE,
} from './ActionTypes';


/*============================================================================
 CONFIRM
 ==============================================================================*/

/* OPEN */
export function confirmOpen(content, callback) {
  return {
    type: CONFIRM_OPEN,
    content,
    callback,
  };
}

/* CLOSE */
export function confirmClose() {
  return {
    type: CONFIRM_CLOSE,
  }
}

