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

/* REGISTER */
export function registerRequest(username, password) {
  return (dispatch) => {
    // Inform Register API is starting
    dispatch(register());

    // API Request
    return axios.post(`${path.__api__}/api/account/signup`, {
      id: username,
      password: password
    }).then((response) => {
      dispatch(registerSuccess());
    }).catch((error) => {
      dispatch(registerFailure(error.response.data.code));
    });
  };
}

export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS
  };
}

export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error
  };
}

/* LOGIN */
export function loginRequest(username, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API Request
    return axios.post(`${path.__api__}/api/account/signin`, {
      id: username,
      password: password
    }).then((response) => {
      const data = response.data;
      if (data.result === 'ok') {
        // SUCCEED
        dispatch(loginSuccess(username));
      } else {
        // FAILED
        dispatch(loginFailure());
      }
    }).catch((error) => {
      dispatch(loginFailure());
    });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(username) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    username
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}