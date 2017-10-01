import {
    LOCATION_INIT,
} from './ActionTypes';
import axios from 'axios';

/*============================================================================
 location
 ==============================================================================*/

/* LOCATION INIT */
export function locationInit() {
    return (dispatch) => {
        Promise.all([
            dispatch(nation()),
            dispatch(location()),
        ]).then((values) => {
            dispatch(locations(values[0], values[1]));
        });
    }
}

export function nation() {
    return (dispatch) => {
        return axios.get('/api/nation')
            .then((response) => {
                if (response.result === 'OK') {
                    return response.data;
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    }
}

export function location() {
    return (dispatch) => {
        return axios.get('/api/location/all')
            .then((response) => {
                if (response.result === 'OK') {
                    return response.data;
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    };
}

export function locations(nation, locations) {
    return {
        type: LOCATION_INIT,
        nation: nation,
        locations: locations,
    };
}