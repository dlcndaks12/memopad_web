import * as types from '../actions/ActionTypes';

const initialState = {
  content: '',
  time: 500,
  show: false,
};

export default function toast(state = initialState, action) {
  switch (action.type) {
    case types.TOAST_OPEN:
      return {
        ...state,
        content: action.content,
        time: action.time,
        show: true,
      };
    case types.TOAST_CLOSE:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}