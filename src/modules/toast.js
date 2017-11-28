import { createAction, handleActions } from 'redux-actions';

const TOAST = 'toast/TOAST';

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param message:String
 * @param time:Number
 */
export const toast = createAction(TOAST);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    message: '',
    time: 0,
    regDate: null,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [TOAST]: (state, action) => {
        console.log(action);
        return {
            ...state,
            message: action.payload.message || action.payload,
            time: action.payload.time,
            regDate: Date.now(),
        }
    },
}, initialState);