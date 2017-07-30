import * as types from '../actions/ActionTypes';

const initialState = {
  login: {
    status: 'INIT',
  },
  register: {
    status: 'INIT',
    error: '',
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
          status: 'FAILURE'
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
          status: 'SUCCESS'
        }
      };
    case types.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          status: 'FAILURE',
          error: action.error,
        },
      };
    default:
      return state;
  }
}