import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as scrapService from 'service/scrap';

const GET_SCRAPS = 'scrap/GET_SCRAPS';
const REGISTER_SCRAP = 'scrap/REGISTER_SCRAP';
const SET_SCRAPS_CONDITION = 'scrap/SET_SCRAPS_CONDITION';

/*============================================================================
 Action
 ===========================================================================*/
export function getScraps() {
    return (dispatch, getState) => {
        const scrap = getState().scrap;
        return dispatch(getScrapsByCondition(scrap.nationCode, scrap.city, scrap.category, scrap.limit, scrap.page));
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
                scraps: res.data.list,
            }
        },
        onFailure: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                total: res.data.total,
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