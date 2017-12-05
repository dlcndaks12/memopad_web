import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as locationService from 'service/location';

const GET_NATIONS = "location/GET_NATIONS";
const GET_CITIES = "location/GET_CITIES";

/*============================================================================
 Action
 ===========================================================================*/
export function initLocations() {
    return (dispatch) => {
        dispatch(nation());
        dispatch(city());
    }
}

/**
 * @param void
 */
export const nation = createAction(GET_NATIONS, locationService.getNations);

/**
 * @param void
 */
export const city = createAction(GET_CITIES, locationService.getCities);

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
        type: GET_NATIONS,
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
        type: GET_CITIES,
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