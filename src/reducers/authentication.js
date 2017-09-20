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
        id: '',
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
                    id: action.id
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