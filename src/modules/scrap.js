import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as scrapService from 'service/scrap';

const GET_SCRAP_LIST = 'scrap/GET_SCRAP_LIST';
const ADD_SCRAP_LIST = 'scrap/ADD_SCRAP_LIST';
const CLEAR_SCRAPS = 'scrap/CLEAR_SCRAPS';
const REGISTER_SCRAP = 'scrap/REGISTER_SCRAP';

/*============================================================================
 Action
 ===========================================================================*/
// export function getScraps(scrapsCondition) {
//     return (dispatch) => {
//         return dispatch(getScrapsByCondition(scrapsCondition.nationCode, scrapsCondition.city, scrapsCondition.category, scrapsCondition.limit, scrapsCondition.page));
//     };
// }
//
// export function addScraps(scrapsCondition) {
//     return (dispatch) => {
//         return dispatch(addScrapsByCondition(scrapsCondition.nationCode, scrapsCondition.city, scrapsCondition.category, scrapsCondition.limit, scrapsCondition.page));
//     };
// }

/**
 * @param nationCode:String
 * @param cityIdx:Number
 * @param categoryIdx:Number
 * @param og:Object
 */
export const registerScrap = createAction(REGISTER_SCRAP, scrapService.registerScrap);

/**
 * @param void
 */
export const getScrapList = createAction(GET_SCRAP_LIST, scrapService.getScraps);

/**
 * @param void
 */
export const addScrapList = createAction(ADD_SCRAP_LIST, scrapService.getScraps);

/**
 * @param void
 */
export const clearScraps = createAction(CLEAR_SCRAPS);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    nationCode: 'kr',
    city: 'all',
    category: 'all',
    limit: 10,
    page: 1,
    total: 0,
    scraps: [],
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    ...pender({
        type: [GET_SCRAP_LIST],
        onSuccess: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                total: res.data.total,
                scraps: res.data.list,
            }
        },
        onFailure: (state) => {
            return {
                ...state,
            }
        },
    }),
    ...pender({
        type: [ADD_SCRAP_LIST],
        onSuccess: (state, action) => {
            const res = action.payload;
            let scraps = JSON.parse(JSON.stringify(state.scraps));
            scraps = scraps.concat(res.data.list);
            return {
                ...state,
                total: res.data.total,
                scraps: scraps,
            }
        },
        onFailure: (state) => {
            return {
                ...state,
            }
        },
    }),
    ...pender({
        type: [REGISTER_SCRAP],
        onSuccess: (state) => {
            return {
                ...state,
            }
        },
        onFailure: (state) => {
            return {
                ...state,
            }
        },
    }),
    [CLEAR_SCRAPS]: (state) => {
        return {
            ...state,
            scraps: [],
        };
    },
}, initialState);