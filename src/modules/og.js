import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as ogService from 'service/og';

const INIT_OG = "scrap/INIT_OG";
const GET_OG_BY_URL = "scrap/GET_OG_BY_URL";
const SET_OG = "scrap/SET_OG";

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param void
 */
export const initOg = createAction(INIT_OG);

/**
 * @param url:String
 */
export const getOgByUrl = createAction(GET_OG_BY_URL, ogService.getOgByUrl);

/**
 * @param ogTitle:String
 * @param ogDescription:String
 */
export const setOg = createAction(SET_OG);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    og: {},
    result: '',
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [INIT_OG]: (state) => {
        return {
            ...state,
            og: {},
            result: '',
        }
    },
    ...pender({
        type: GET_OG_BY_URL,
        onSuccess: (state, action) => {
            const res = action.payload;
            if (res.result === 'OK') {
                return {
                    ...state,
                    result: res.result,
                    og: {
                        ...state.og,
                        ogImageUrl: res.data.ogImageUrl,
                        ogTitle: res.data.ogTitle,
                        ogDescription: res.data.ogDescription,
                        ogUrl: res.data.ogUrl,
                        map: res.data.map,
                    }
                }
            } else {
                return {
                    ...state,
                    result: res.result,
                }
            }
        },
        onFailure: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                result: res.result,
            }
        },
    }),
    [SET_OG]: (state, action) => {
        return {
            ...state,
            og: {
                ...state.og,
                ogTitle: action.payload.ogTitle,
                ogDescription: action.payload.ogDescription,
            }
        }
    },
}, initialState);