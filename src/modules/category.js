import { createAction, handleActions } from 'redux-actions';
import * as categoryService from 'service/category';

const CATEGORY_INIT = "category/CATEGORY_INIT";

/*============================================================================
 Action
 ===========================================================================*/
export function categoryRequest() {
    return (dispatch) => {
        return categoryService.getCategoryList()
            .then((response) => {
                if (response.result === 'OK') {
                    dispatch(categoryInit(response.data));
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    }
}

/**
 * @param category:Object
 */
export const categoryInit = createAction(CATEGORY_INIT);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    category: null,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [CATEGORY_INIT]: (state, action) => {
        return {
            ...state,
            category: action.payload,
        }
    },
}, initialState);