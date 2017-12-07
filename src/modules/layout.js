import { createAction, handleActions } from 'redux-actions';

const SCROLL_END = "layout/SCROLL_END";

/*============================================================================
 Action
 ===========================================================================*/
export function setScrollEnd (isEnd) {
    return (dispatch, getState) => {
        const currentEnd = getState().layout.scroll.end;
        if (currentEnd === isEnd) {
            return;
        }
        dispatch(scrollEnd(isEnd));
    };
}
/**
 * @param isEnd:Boolean
 */
export const scrollEnd = createAction(SCROLL_END);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    scroll: {
        end: false,
    },
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [SCROLL_END]: (state, action) => {
        return {
            ...state,
            scroll: {
                ...state.scroll,
                end: action.payload,
            }
        }
    }
}, initialState);