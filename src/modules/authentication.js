import { createAction, handleActions } from 'redux-actions';
import * as authenticationService from 'service/authentication';
import { setCookie } from 'util/cookie';

const AUTH = "authentication/AUTH";
const AUTH_SUCCESS = "authentication/AUTH_SUCCESS";
const AUTH_FAILURE = "authentication/AUTH_FAILURE";
const AUTH_LOGIN = "authentication/AUTH_LOGIN";
const AUTH_LOGIN_SUCCESS = "authentication/AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE = "authentication/AUTH_LOGIN_FAILURE";
const AUTH_LOGOUT = "authentication/AUTH_LOGOUT";
const AUTH_REGISTER = "authentication/AUTH_REGISTER";
const AUTH_REGISTER_SUCCESS = "authentication/AUTH_REGISTER_SUCCESS";
const AUTH_REGISTER_FAILURE = "authentication/AUTH_REGISTER_FAILURE ";

/*============================================================================
 Action
 ===========================================================================*/
export function authRequest() {
    return (dispatch) => {
        dispatch(auth);
        return authenticationService.auth()
            .then((response) => {
                if (response.result === 'OK') {
                    dispatch(authSuccess(response.data.id, response.data.nickname));
                } else {
                    dispatch(authFailure(response.message));
                }
            }).catch((error) => {
                dispatch(authFailure(error.error));
            });
    }
}

/**
 * @param void
 */
export const auth = createAction(AUTH);

/**
 * @param id:String
 * @param nickname:String
 */
export const authSuccess = createAction(AUTH_SUCCESS);

/**
 * @param message:String
 */
export const authFailure = createAction(AUTH_FAILURE);

export function loginRequest(id, password) {
    return (dispatch) => {
        dispatch(login());
        return authenticationService.login(id, password)
            .then((response) => {
                if (response.result === 'OK') {
                    // SUCCEED
                    setCookie('Authentication', response.data.token, 365);
                    dispatch(loginSuccess(id));
                } else {
                    // FAILED
                    dispatch(loginFailure());
                }
            }).catch((error) => {
                dispatch(loginFailure(error.message));
            });
    };
}

/**
 * @param void
 */
export const login = createAction(AUTH_LOGIN);

/**
 * @param id:String
 */
export const loginSuccess = createAction(AUTH_LOGIN_SUCCESS);

/**
 * @param message:String
 */
export const loginFailure = createAction(AUTH_LOGIN_FAILURE);

/**
 * @param void
 */
export const logout = createAction(AUTH_LOGOUT);

export function registerRequest(id, nickname, password) {
    return (dispatch) => {
        dispatch(register());
        return authenticationService.signup(id, nickname, password)
            .then((response) => {
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

/**
 * @param void
 */
export const register = createAction(AUTH_REGISTER);

/**
 * @param id:String
 */
export const registerSuccess = createAction(AUTH_REGISTER_SUCCESS);

/**
 * @param message:String
 */
export const registerFailure = createAction(AUTH_REGISTER_FAILURE);


/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    auth: {
        status: 'INIT',
        message: '',
    },
    login: {
        status: 'INIT',
        message: '',
    },
    register: {
        status: 'INIT',
        message: '',
    },
    status: {
        id: '',
        nickname: '',
        isLoggedIn: null,
    }
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [AUTH]: (state) => {
        return {
            ...state,
            auth: {
                status: 'WAITING'
            },
        }
    },
    [AUTH_SUCCESS]: (state, action) => {
        return {
            ...state,
            auth: {
                status: 'SUCCESS'
            },
            status: {
                ...state.status,
                id: action.payload.id,
                nickname: action.payload.nickname,
                isLoggedIn: true,
            }
        }
    },
    [AUTH_FAILURE]: (state, action) => {
        return {
            ...state,
            auth: {
                status: 'FAILURE',
                message: action.payload,
            },
            status: {
                ...state.status,
                isLoggedIn: false,
            }
        };
    },
    [AUTH_LOGIN]: (state) => {
        return {
            ...state,
            login: {
                ...state.login,
                status: 'WAITING'
            },
        };
    },
    [AUTH_LOGIN_SUCCESS]: (state, action) => {
        return {
            ...state,
            login: {
                ...state.login,
                status: 'SUCCESS'
            },
            status: {
                ...state.status,
                id: action.payload,
                isLoggedIn: true,
            }
        };
    },
    [AUTH_LOGIN_FAILURE]: (state, action) => {
        return {
            ...state,
            login: {
                ...state.login,
                status: 'FAILURE',
                message: action.payload,
            },
        };
    },
    [AUTH_LOGOUT]: (state) => {
        return {
            ...state,
            status: {
                ...state.status,
                id: '',
                isLoggedIn: false,
            }
        };
    },
    [AUTH_REGISTER]: (state) => {
        return {
            ...state,
            register: {
                status: 'WAITING'
            },
        };
    },
    [AUTH_REGISTER_SUCCESS]: (state, action) => {
        return {
            ...state,
            register: {
                status: 'SUCCESS',
                message: action.payload,
            }
        };
    },
    [AUTH_REGISTER_FAILURE]: (state, action) => {
        return {
            ...state,
            register: {
                status: 'FAILURE',
                message: action.payload,
            },
        };
    },
}, initialState);