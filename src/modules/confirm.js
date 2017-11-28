import { createAction, handleActions } from 'redux-actions';

const CONFIRM_OPEN = "confirm/CONFIRM_OPEN";
const CONFIRM_CLOSE = "confirm/CONFIRM_CLOSE";

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param content:String
 * @param callback:Function
 */
export const confirmOpen = createAction(CONFIRM_OPEN);

/**
 * @param void
 */
export const confirmClose = createAction(CONFIRM_CLOSE);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    content: '',
    callback: null,
    show: false,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [CONFIRM_OPEN]: (state, action) => {
        return {
            ...state,
            content: action.payload.content,
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