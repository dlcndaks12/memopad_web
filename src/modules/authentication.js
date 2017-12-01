import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as authenticationService from 'service/authentication';
import { setCookie, deleteCookie } from 'util/cookie';

const AUTH = 'authentication/AUTH';
const AUTH_FAILURE = 'authentication/AUTH_FAILURE';
const LOGIN = 'authentication/LOGIN';
const LOGOUT = 'authentication/LOGOUT';
const SIGN_UP = 'authentication/SIGN_UP';

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param void
 */
export const auth = createAction(AUTH, authenticationService.auth);

/**
 * @param void
 */
export const authFailure = createAction(AUTH_FAILURE);

/**
 * @param void
 */
export const login = createAction(LOGIN, authenticationService.login);

/**
 * @param void
 */
export const logout = createAction(LOGOUT);

/**
 * @param id:String
 * @param nickname:String
 * @param password:String
 */
export const signUp = createAction(SIGN_UP, authenticationService.signup);


/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    auth: {
        id: '',
        nickname: '',
        isLoggedIn: null,
    },
    message: '',
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    ...pender({
        type: AUTH,
        onSuccess: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                auth: {
                    ...state.auth,
                    id: res.data.id,
                    nickname: res.data.nickname,
                    isLoggedIn: true,
                }
            }
        },
        onFailure: (state, action) => {
            deleteCookie('Authentication');
            const res = action.payload;
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isLoggedIn: false,
                },
                message: res ? res.message : '',
            };
        },
    }),
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => {
            const res = action.payload;
            setCookie('Authentication', res.data.token, 365);
            return {
                ...state,
                auth: {
                    id: res.data.id,
                    nickname: res.data.nickname,
                    isLoggedIn: true,
                },
                message: res.message,
            }
        },
        onFailure: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                message: res.message,
            };
        },
    }),
    ...pender({
        type: SIGN_UP,
        onSuccess: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                message: res.message,
            };
        },
        onFailure: (state, action) => {
            const res = action.payload;
            return {
                ...state,
                message: res.message,
            };
        },
    }),
    [LOGOUT]: (state) => {
        deleteCookie('Authentication');
        return {
            ...state,
            auth: {
                ...state.auth,
                id: '',
                nickname: '',
                isLoggedIn: false,
            }
        };
    },
}, initialState);