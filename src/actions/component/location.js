import {
    LOCATION_INIT,
} from '../ActionTypes';
import axios from 'axios';

/*============================================================================
 location
 ==============================================================================*/

/* LOCATION INIT */
export function locationInit() {
    return (dispatch) => {
        Promise.all([
            dispatch(nation()),
            dispatch(city()),
        ]).then((values) => {
            dispatch(location(values[0], values[1]));
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

export function city() {
    return (dispatch) => {
        return axios.get('/api/city/all')
            .then((response) => {
                if (response.result === 'OK') {
                    return response.data;
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    };
}

export function location(nation, city) {
    return {
        type: LOCATION_INIT,
        nation: nation,
        city: city,
    };
}