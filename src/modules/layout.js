import { createAction, handleActions } from 'redux-actions';
import { pathnameToPageName } from 'util/layout';

const SCROLL_END = "layout/SCROLL_END";
const SET_SCROLL_TOP = "layout/SET_SCROLL_TOP";
const SCROLL_TO = "layout/SCROLL_TO";
const SET_PAGE_NAME = "layout/SET_PAGE_NAME";

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
export const setScrollTop = createAction(SET_SCROLL_TOP);

/**
 * @param top:Number
 */
export const scrollTo = createAction(SCROLL_TO);

/**
 * @param pathname:String
 */
export const setPageName = createAction(SET_PAGE_NAME);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    scroll: {
        end: false,
        top: 0,
    },
    pageName: '',
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
    [SET_SCROLL_TOP]: (state, action) => {
        return {
            ...state,
            scroll: {
                ...state.scroll,
                top: action.payload,
            }
        }
    },
    /*[SCROLL_TO]: (state, action) => {
        return {
            ...state,
            scroll: {
                ...state.scroll,
                top: action.payload,
            }
        }
    }*/
    [SET_PAGE_NAME]: (state, action) => {
        return {
            ...state,
            pageName: pathnameToPageName(action.payload),
        }
    },
}, initialState);