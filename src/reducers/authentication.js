import * as types from '../actions/ActionTypes';

const initialState = {
    login: {
        status: 'INIT',
        message: '',
    },
    register: {
        status: 'INIT',
        message: '',
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                login: {
                    status: 'WAITING'
                },
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    status: 'SUCCESS'
                },
                status: {
                    isLoggedIn: true,
                    currentUser: action.username
                }
            };
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...state,
                login: {
                    status: 'FAILURE',
                    message: action.message,
                },
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
                    message: action.response.message,
                }
            };
        case types.AUTH_REGISTER_FAILURE:
            return {
                ...state,
                register: {
                    status: 'FAILURE',
                    message: action.response.message,
                },
            };
        default:
            return state;
    }
}