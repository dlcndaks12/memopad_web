import * as types from '../actions/ActionTypes';

const initialState = {
  login: {
    status: 'INIT',
    id: '',
    key: '',
  },
  register: {
    status: 'INIT',
    message: '',
  },
  auth: {},
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
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
          status: 'SUCCESS',
          id: action.id,
          key: action.key,
        },
      };
    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'FAILURE'
        },
      };
    case types.AUTH_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'WAITING'
        },
      };
    case types.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'SUCCESS'
        },
      };
    case types.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'FAILURE',
          message: action.message,
        },
      };
    case types.AUTH_INFO:
      return {
        ...state,
        auth: action.auth,
      };
    default:
      return state;
  }
}