import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as scrapService from 'service/scrap';
import { toast } from 'modules/toast';

const GET_SCRAP_LIST = 'scrap/GET_SCRAP_LIST';
const GET_SCRAP = 'scrap/GET_SCRAP';
const ADD_SCRAP_LIST = 'scrap/ADD_SCRAP_LIST';
const CLEAR_SCRAP_LIST = 'scrap/CLEAR_SCRAP_LIST';
const REGISTER_SCRAP = 'scrap/REGISTER_SCRAP';
const UPDATE_SCRAP = 'scrap/UPDATE_SCRAP';
const DELETE_SCRAP = 'scrap/DELETE_SCRAP';
const LIKE_SCRAP = 'scrap/LIKE_SCRAP';
const LIKE_SCRAP_CANCEL = 'scrap/LIKE_SCRAP_CANCEL';

/*============================================================================
 Action
 ===========================================================================*/
// export function getScrapList(scrapsCondition) {
//     return (dispatch) => {
//         return dispatch(getScrapListByCondition(scrapsCondition.nationCode, scrapsCondition.city, scrapsCondition.category, scrapsCondition.limit, scrapsCondition.page));
//     };
// }
//
// export function addScraps(scrapsCondition) {
//     return (dispatch) => {
//         return dispatch(addScrapsByCondition(scrapsCondition.nationCode, scrapsCondition.city, scrapsCondition.category, scrapsCondition.limit, scrapsCondition.page));
//     };
// }

/**
 * @param scrapCondition:Object
 */
export const getScrapList = createAction(GET_SCRAP_LIST, scrapService.getScrapList);

/**
 * @param idx:Number
 */
export const getScrap = createAction(GET_SCRAP, scrapService.getScrap);

/**
 * @param scrapCondition:Object
 */
export const addScrapList = createAction(ADD_SCRAP_LIST, scrapService.getScrapList);

/**
 * @param void
 */
export const clearScrapList = createAction(CLEAR_SCRAP_LIST);

/**
 * @param nationCode:String
 * @param cityIdx:Number
 * @param categoryIdx:Number
 * @param og:Object
 */
export const registerScrap = createAction(REGISTER_SCRAP, scrapService.registerScrap);

/**
 * @param scrapIdx:Number
 * @param nationCode:String
 * @param cityIdx:Number
 * @param categoryIdx:Number
 * @param og:Object
 */
export const updateScrap = createAction(UPDATE_SCRAP, scrapService.updateScrap);

/**
 * @param scrapIdx:Number
 */
export const deleteScrap = createAction(DELETE_SCRAP, scrapService.deleteScrap);

/**
 * @param scrapIdx:Number
 */
export const likeScrap = createAction(LIKE_SCRAP, scrapService.likeScrap);

/**
 * @param scrapIdx:Number
 */
export const likeScrapCancel = createAction(LIKE_SCRAP_CANCEL, scrapService.likeScrapCancel);

/**
 * @param idx:Number
 * @param isLiked:Boolean
 */
export function handleLike(idx, isLiked) {
    return (dispatch, getState) => {
        if (!getState().auth.isLoggedIn) {
            dispatch(toast('로그인 해주세요.'));
            return new Promise(() => null);
        }

        if (isLiked) {
            return dispatch(likeScrap(idx));
        } else {
            return dispatch(likeScrapCancel(idx));
        }
    };
}

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
        type: [GET_SCRAP],
        onSuccess: (state) => ({...state}),
        onFailure: (state) => ({...state}),
    }),
    ...pender({
        type: [ADD_SCRAP_LIST],
        onSuccess: (state, action) => {
            const res = action.payload;
            let scraps = JSON.parse(JSON.stringify(state.scraps));
            scraps = scraps.concat(res.data.list);
            return {
                ...state,
                page: res.data.page,
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
        onSuccess: (state) => ({...state}),
        onFailure: (state) => ({...state}),
    }),
    [CLEAR_SCRAP_LIST]: (state) => {
        return {
            ...state,
            scraps: [],
        };
    },
    ...pender({
        type: [DELETE_SCRAP],
        onSuccess: (state, action) => {
            const res = action.payload;
            const deletedScraps = state.scraps.filter((item) => {
                return item.idx !== res.data;
            });
            return {
                ...state,
                scraps: deletedScraps,
            }
        },
        onFailure: (state) => {
            return {
                ...state,
            }
        },
    }),
    ...pender({
        type: [LIKE_SCRAP],
        onSuccess: (state) => ({...state}),
        onFailure: (state) => ({...state}),
    }),
}, initialState);