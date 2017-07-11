import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_INFO,
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
      if (response.status === 201) {
        dispatch(registerSuccess());
      } else {
        dispatch(registerFailure(response.status));
      }
    }).catch((error) => {
      const response = error.response;
      dispatch(registerFailure(response.data.message));
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

export function registerFailure(message) {
  return {
    type: AUTH_REGISTER_FAILURE,
    message
  };
}

/* LOGIN */
export function loginRequest(id, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API Request
    return axios.post(`${path.__api__}/api/account/signin`, {
      id: id,
      password: password
    }).then((response) => {
      if (response.status === 200) {
        // SUCCEED
        dispatch(loginSuccess(id, response.data.key));
      } else {
        // FAILED
        dispatch(loginFailure());
      }
    }).catch((error) => {
      console.log(error);
      dispatch(loginFailure());
    });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(id, key) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    id,
    key,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}

/* AUTH CHECK */
export function auth() {
  return (dispatch) => {
    // API Request
    return axios.get(`${path.__api__}/api/account/auth`
    ).then((response) => {
      console.log(response);
      dispatch(authInfo(response.data));
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function authInfo(auth) {
  return {
    type: AUTH_INFO,
    auth: auth,
  };
}