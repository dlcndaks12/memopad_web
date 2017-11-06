import * as types from '../actions/ActionTypes';

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

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case types.AUTH:
            return {
                ...state,
                auth: {
                    status: 'WAITING'
                },
            };
        case types.AUTH_SUCCESS:
            return {
                ...state,
                auth: {
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    id: action.id,
                    nickname: action.nickname,
                    isLoggedIn: true,
                }
            };
        case types.AUTH_FAILURE:
            return {
                ...state,
                auth: {
                    status: 'FAILURE',
                    message: action.message,
                },
                status: {
                    ...state.status,
                    isLoggedIn: false,
                }
            };
        case types.AUTH_LOGIN:
            return {
                ...state,
                login: {
                    ...state.login,
                    status: 'WAITING'
                },
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    id: action.id,
                    isLoggedIn: true,
                }
            };
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...state,
                login: {
                    ...state.login,
                    status: 'FAILURE',
                    message: action.message,
                },
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                status: {
                    ...state.status,
                    id: '',
                    isLoggedIn: false,
                }
            };
        case types.AUTH_REGISTER:
            return {
                ...state,
                register: {
                    status: 'WAITING'
                },
            };
        case types.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    status: 'SUCCESS',
                    message: action.message,
                }
            };
        case types.AUTH_REGISTER_FAILURE:
            return {
                ...state,
                register: {
                    status: 'FAILURE',
                    message: action.message,
                },
            };
        default:
            return state;
    }
}