import { createAction, handleActions } from 'redux-actions';
import * as locationService from 'service/location';

const LOCATION_INIT = "location/LOCATION_INIT";

/*============================================================================
 Action
 ===========================================================================*/
export function locationRequest() {
    return (dispatch) => {
        Promise.all([
            dispatch(nationRequest()),
            dispatch(cityRequest()),
        ]).then((values) => {
            dispatch(locationInit(values[0], values[1]));
        });
    }
}

export function nationRequest() {
    return () => {
        return locationService.getNationList()
            .then((response) => {
                if (response.result === 'OK') {
                    return response.data;
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    }
}

export function cityRequest() {
    return () => {
        return locationService.getCityList()
            .then((response) => {
                if (response.result === 'OK') {
                    return response.data;
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    };
}

/**
 * @param nation:Object
 * @param city:Object
 */
export const locationInit = createAction(LOCATION_INIT);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    nation: null,
    city: null,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [LOCATION_INIT]: (state, action) => {
        return {
            ...state,
            nation: action.payload.nation,
            city: action.payload.city,
        }
    },
}, initialState);