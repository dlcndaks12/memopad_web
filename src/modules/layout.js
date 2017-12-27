import { createAction, handleActions } from 'redux-actions';

const SCROLL_END = "layout/SCROLL_END";
const SCROLL_TO = "layout/SCROLL_TO";

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

/**
 * @param top:Number
 */
export const scrollTo = createAction(SCROLL_TO);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    scroll: {
        end: false,
        top: 0,
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
    },
    [SCROLL_TO]: (state, action) => {
        return {
            ...state,
            scroll: {
                ...state.scroll,
                top: action.payload,
            }
        }
    }
}, initialState);