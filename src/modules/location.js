import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as locationService from 'service/location';

const NATION = "location/NATION";
const CITY = "location/CITY";

/*============================================================================
 Action
 ===========================================================================*/
export function locationInit() {
    return (dispatch) => {
        dispatch(nation());
        dispatch(city());
    }
}

/**
 * @param void
 */
export const nation = createAction(NATION, locationService.getNationList);

/**
 * @param void
 */
export const city = createAction(CITY, locationService.getCityList);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    nation: null,
    city: null,
    message: '',
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    ...pender({
        type: NATION,
        onSuccess: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                nation: res.data,
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
    ...pender({
        type: CITY,
        onSuccess: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                city: res.data,
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