import { createAction, handleActions } from 'redux-actions';

const PROGRESS_SHOW = "progress/PROGRESS_SHOW";
const PROGRESS_HIDE = "progress/PROGRESS_HIDE";

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param void
 */
export const progressShow = createAction(PROGRESS_SHOW);

/**
 * @param void
 */
export const progressHide = createAction(PROGRESS_HIDE);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    show: false,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [PROGRESS_SHOW]: (state) => {
        return {
            ...state,
            show: true,
        }
    },
    [PROGRESS_HIDE]: (state) => {
        return {
            ...state,
            show: false,
        }
    }
}, initialState);