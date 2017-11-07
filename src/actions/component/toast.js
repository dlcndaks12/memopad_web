import {
    TOAST,
} from '../ActionTypes';

/*============================================================================
 TOAST
 ==============================================================================*/

/* OPEN */
export function toast(message, time) {
    return {
        type: TOAST,
        message,
        time,
    };
}

