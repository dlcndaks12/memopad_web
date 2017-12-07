import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as scrapService from 'service/scrap';

const GET_SCRAPS = 'scrap/GET_SCRAPS';
const ADD_SCRAPS = 'scrap/ADD_SCRAPS';
const REGISTER_SCRAP = 'scrap/REGISTER_SCRAP';
const SET_SCRAPS_CONDITION = 'scrap/SET_SCRAPS_CONDITION';

/*============================================================================
 Action
 ===========================================================================*/
export function getScraps(scrapsCondition) {
    return (dispatch) => {
        dispatch(setScrapsCondition(scrapsCondition));
        return dispatch(getScrapsByCondition(scrapsCondition.nationCode, scrapsCondition.city, scrapsCondition.category, scrapsCondition.limit, scrapsCondition.page));
    };
}

export function addScraps(scrapsCondition) {
    return (dispatch) => {
        dispatch(setScrapsCondition(scrapsCondition));
        return dispatch(addScrapsByCondition(scrapsCondition.nationCode, scrapsCondition.city, scrapsCondition.category, scrapsCondition.limit, scrapsCondition.page));
    };
}

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
export const getScrapsByCondition = createAction(GET_SCRAPS, scrapService.getScraps);

/**
 * @param void
 */
export const addScrapsByCondition = createAction(ADD_SCRAPS, scrapService.getScraps);

/**
 * @param scrapListCondition:Object
 */
export const setScrapsCondition = createAction(SET_SCRAPS_CONDITION);

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
        type: [GET_SCRAPS],
        onSuccess: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                total: res.data.total,
                totalPage: res.data.totalPage,
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
        type: [ADD_SCRAPS],
        onSuccess: (state, action) => {
            const res = action.payload;
            let scraps = JSON.parse(JSON.stringify(state.scraps));
            scraps = scraps.concat(res.data.list);
            return {
                ...state,
                total: res.data.total,
                totalPage: res.data.totalPage,
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
    [SET_SCRAPS_CONDITION]: (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    },
}, initialState);