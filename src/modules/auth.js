import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as authService from 'service/auth';
import { setCookie, deleteCookie } from 'util/cookie';

const AUTH = 'auth/AUTH';
const AUTH_FAILURE = 'auth/AUTH_FAILURE';
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const SIGN_UP = 'auth/SIGN_UP';

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param void
 */
export const auth = createAction(AUTH, authService.auth);

/**
 * @param void
 */
export const authFailure = createAction(AUTH_FAILURE);

/**
 * @param void
 */
export const login = createAction(LOGIN, authService.login);

/**
 * @param void
 */
export const logout = createAction(LOGOUT);

/**
 * @param id:String
 * @param nickname:String
 * @param password:String
 */
export const signUp = createAction(SIGN_UP, authService.signup);


/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    id: '',
    nickname: '',
    isLoggedIn: null,
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
                id: res.data.id,
                nickname: res.data.nickname,
                isLoggedIn: true,
            }
        },
        onFailure: (state) => {
            deleteCookie('Authentication');
            return {
                ...state,
                isLoggedIn: false,
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
                id: res.data.id,
                nickname: res.data.nickname,
                isLoggedIn: true,
            }
        },
        onFailure: (state) => {
            return {
                ...state,
                isLoggedIn: false,
            };
        },
    }),
    ...pender({
        type: SIGN_UP,
        onSuccess: (state) => {
            return {
                ...state,
            };
        },
        onFailure: (state) => {
            return {
                ...state,
            };
        },
    }),
    [LOGOUT]: (state) => {
        deleteCookie('Authentication');
        return {
            ...state,
            id: '',
            nickname: '',
            isLoggedIn: false,
        };
    },
}, initialState);