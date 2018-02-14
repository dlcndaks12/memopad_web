import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as scrapService from 'service/scrap';

const GET_SCRAPS = 'scrap/GET_SCRAPS';
const ADD_SCRAPS = 'scrap/ADD_SCRAPS';
const CLEAR_SCRAPS = 'scrap/CLEAR_SCRAPS';
const REGISTER_SCRAP = 'scrap/REGISTER_SCRAP';
const SET_SCRAPS_CONDITION = 'scrap/SET_SCRAPS_CONDITION';

/*============================================================================
 Action
 ===========================================================================*/
export function getScraps(scrapsCondition, settable) {
    return (dispatch) => {
        if (settable !== false) dispatch(setScrapsCondition(scrapsCondition));
        return dispatch(getScrapsByCondition(scrapsCondition.nationCode, scrapsCondition.city, scrapsCondition.category, scrapsCondition.limit, scrapsCondition.page));
    };
}

export function addScraps(scrapsCondition, settable) {
    return (dispatch) => {
        if (!settable) dispatch(setScrapsCondition(scrapsCondition));
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
        type: [GET_SCRAPS],
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
        type: [ADD_SCRAPS],
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
    [SET_SCRAPS_CONDITION]: (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    },
}, initialState);