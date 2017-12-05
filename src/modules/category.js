import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as categoryService from 'service/category';

const CATEGORY = "category/CATEGORY";

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param void
 */
export const category = createAction(CATEGORY, categoryService.getCategories);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    category: null,
    message: '',
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    ...pender({
        type: CATEGORY,
        onSuccess: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                category: res.data,
            }
        },
        onFailure: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                message: res.message,
            }
        },
    }),
}, initialState);