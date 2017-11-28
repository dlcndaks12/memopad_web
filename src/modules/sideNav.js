import { createAction, handleActions } from 'redux-actions';

const SIDE_NAV_OPEN = "sideNav/SIDE_NAV_OPEN";
const SIDE_NAV_CLOSE = "sideNav/SIDE_NAV_CLOSE";

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param void
 */
export const sideNavOpen = createAction(SIDE_NAV_OPEN);

/**
 * @param void
 */
export const sideNavClose = createAction(SIDE_NAV_CLOSE);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    isOpen: false,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [SIDE_NAV_OPEN]: (state) => {
        return {
            ...state,
            isOpen: true,
        }
    },
    [SIDE_NAV_CLOSE]: (state) => {
        return {
            ...state,
            isOpen: false,
        }
    }
}, initialState);