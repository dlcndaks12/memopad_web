import * as types from '../actions/ActionTypes';

const initialState = {
  login: {
    status: 'INIT'
  },
  status: {
    isLoggedIn: false,
    currentUser: ''
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
    default:
      return state;
  }
}