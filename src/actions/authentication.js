import {
    AUTH,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
} from './ActionTypes';
import axios from 'axios';
import { setCookie } from 'js/util';

/*============================================================================
 authentication
 ==============================================================================*/

/* AUTH CHECK */
export function authRequest() {
    return (dispatch) => {
        // Inform Auth API is starting
        dispatch(auth());

        // API Request
        return axios.get('/api/auth', {

        }).then((response) => {
            if (response.result === 'OK') {
                dispatch(authSuccess(response.data.id));
            } else {
                dispatch(authFailure(response.message));
            }
        }).catch((error) => {
            console.log('catch', error);
            dispatch(authFailure(error.error));
        });
    };
}

export function auth() {
  return {
    type: AUTH,
  };
}

export function authSuccess(id) {
  return {
    type: AUTH_SUCCESS,
    id: id
  };
}

export function authFailure(message) {
  return {
    type: AUTH_FAILURE,
    message: message,
  };
}

/* LOGIN */
export function loginRequest(id, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API Request
        return axios.post('/api/auth/login', {
            id: id,
            password: password
        }).then((response) => {
            if (response.result === 'OK') {
                // SUCCEED
                setCookie('Authentication', response.data.token, 365);
                dispatch(loginSuccess(id));
            } else {
                // FAILED
                dispatch(loginFailure());
            }
        }).catch((error) => {
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

/* LOGOUT */
export function logout() {
  return {
    type: AUTH_LOGOUT
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
            dispatch(registerFailure(error.error));
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