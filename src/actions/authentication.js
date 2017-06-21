import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE
} from './ActionTypes';
import axios from 'axios';
import * as path from '../utils/path';


/*============================================================================
 authentication
 ==============================================================================*/

/* LOGIN */
export function loginRequest(username, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API REQUEST
    return axios.post(`${path.__api__}/api/account/signin`, {
        id: username,
        password: password
      }).then((response) => {
        // SUCCEED
        dispatch(loginSuccess(username));
      }).catch((error) => {
        // FAILED
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