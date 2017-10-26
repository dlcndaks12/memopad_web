import {
  SIDE_NAV_OPEN,
  SIDE_NAV_CLOSE,
} from './ActionTypes';

/*============================================================================
 SIDE NAV
 ==============================================================================*/

/* OPEN */
export function sideNavOpen() {
  return {
    type: SIDE_NAV_OPEN,
  };
}

/* CLOSE */
export function sideNavClose() {
  return {
    type: SIDE_NAV_CLOSE,
  };
}

