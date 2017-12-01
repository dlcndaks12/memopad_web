import { createAction, handleActions } from 'redux-actions';

const CONFIRM = "confirm/CONFIRM";
const CONFIRM_CLOSE = "confirm/CONFIRM_CLOSE";

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param content:String
 * @param callback:Function
 */
export const confirm = createAction(CONFIRM);

/**
 * @param void
 */
export const confirmClose = createAction(CONFIRM_CLOSE);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    message: '',
    callback: null,
    show: false,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [CONFIRM]: (state, action) => {
        return {
            ...state,
            message: action.payload.message,
            callback: action.payload.callback,
            show: true,
        }
    },
    [CONFIRM_CLOSE]: (state) => {
        return {
            ...state,
            show: false,
        }
    },
}, initialState);