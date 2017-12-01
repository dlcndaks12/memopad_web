import { createAction, handleActions } from 'redux-actions';
import * as scrapService from 'service/scrap';

const SCRAP_LIST = "scrap/SCRAP_LIST";
const SCRAP_LIST_SUCCESS = "scrap/SCRAP_LIST_SUCCESS";
const SCRAP_LIST_FAILURE = "scrap/SCRAP_LIST_FAILURE";
const SCRAP_SET_LIST_CONDITION = "scrap/SCRAP_SET_LIST_CONDITION";

/*============================================================================
 Action
 ===========================================================================*/
export function requestScrapList() {
    return (dispatch, getState) => {
        const state = getState().scrap;
        dispatch(scrapList());

        const nationCode = state.scrapListCondition.nationCode;
        const limit = state.scrapListCondition.limit;
        const page = state.scrapListCondition.page;
        let city = state.scrapListCondition.city !== 'none' ? state.scrapListCondition.city === 'all' ? null : state.scrapListCondition.city.toString() : -1;
        let category = state.scrapListCondition.category !== 'none' ? state.scrapListCondition.category === 'all' ? null : state.scrapListCondition.category.toString() : -1;

        return scrapService.getScrapList(nationCode, city, category, limit, page)
            .then((response) => {
                if (response.result === 'OK') {
                    console.log(response);
                    dispatch(scrapListSuccess(response.data.list));
                } else {
                    dispatch(scrapListFailure(response.message));
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    };
}

/**
 * @param scrapListCondition:Object
 */
export const scrapSetListCondition = createAction(SCRAP_SET_LIST_CONDITION);

/**
 * @param void
 */
export const scrapList = createAction(SCRAP_LIST);

/**
 * @param list:Array
 */
export const scrapListSuccess = createAction(SCRAP_LIST_SUCCESS);

/**
 * @param message:String
 */
export const scrapListFailure = createAction(SCRAP_LIST_FAILURE);


/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    nationCode: 'kr',
    city: 'all',
    category: 'all',
    limit: 10,
    page: 1,
    scrapList: {
        status: 'INIT',
        message: '',
        list: [],
    },
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [SCRAP_SET_LIST_CONDITION]: (state, action) => {
        return {
            ...state,
            ...action.payload,
        }
    },
    [SCRAP_LIST]: (state) => {
        return {
            ...state,
            scrapList: {
                ...state.scrapList,
                status: 'WAITING',
            }
        }
    },
    [SCRAP_LIST_SUCCESS]: (state, action) => {
        return {
            ...state,
            scrapList: {
                ...state.scrapList,
                status: 'SUCCESS',
                list: action.payload,
            }
        }
    },
    [SCRAP_LIST_FAILURE]: (state, action) => {
        return {
            ...state,
            scrapList: {
                ...state.scrapList,
                status: 'FAILURE',
                message: action.payload,
            }
        }
    },
}, initialState);