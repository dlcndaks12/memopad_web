import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
} from './ActionTypes';
import axios from 'axios';
import * as path from '../config/path';

/*============================================================================
 authentication
 ==============================================================================*/

/* AUTH */
export function authRequest() {
    return (dispatch) => {
        // API Request
        return axios.post(`${path.__api__}/api/user/auth`, {

        }).then((response) => {
            console.log('then', response);
            const data = response.data;
            if (data.result === 'OK') {
                dispatch(registerSuccess());
            } else {
                dispatch(registerFailure(data.code));
            }
        }).catch((error) => {
            console.log('catch', error.response);
            dispatch(registerFailure(error.response));
        });
    };
}

/* LOGIN */
export function loginRequest(id, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API Request
        return axios.post(`${path.__api__}/api/auth/login`, {
            id: id,
            password: password
        }).then((response) => {
            if (response.result === 'OK') {
                // SUCCEED
                localStorage.setItem('token', response.data.token);
                dispatch(loginSuccess(id));
            } else {
                // FAILED
                dispatch(loginFailure());
            }
        }).catch((error) => {
            console.log('error', error);
            dispatch(loginFailure(error.error));
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(id) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        id
    };
}

export function loginFailure(message) {
    return {
        type: AUTH_LOGIN_FAILURE,
        message: message,
    };
}

/* REGISTER */
export function registerRequest(id, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        // API Request
        return axios.post('/api/user', {
            id: id,
            password: password
        }).then((response) => {
            if (response.result === 'OK') {
                dispatch(registerSuccess(response.message));
            } else {
                dispatch(registerFailure(response.message));
            }
        }).catch((error) => {
            dispatch(registerFailure(error.message));
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess(message) {
    return {
        type: AUTH_REGISTER_SUCCESS,
        message: message,
    };
}

export function registerFailure(message) {
    return {
        type: AUTH_REGISTER_FAILURE,
        message: message,
    };
}