import {
  PROGRESS_SHOW,
  PROGRESS_HIDE,
} from './ActionTypes';


/*============================================================================
 PROGRESS
 ==============================================================================*/

/* SHOW */
export function progressShow() {
  return {
    type: PROGRESS_SHOW,
  };
}

/* HIDE */
export function progressHide() {
  return {
    type: PROGRESS_HIDE,
  }
}

