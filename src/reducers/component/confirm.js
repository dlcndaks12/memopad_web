import * as types from '../../actions/ActionTypes';

const initialState = {
  content: '',
  callback: null,
  show: false,
};

export default function toast(state = initialState, action) {
  switch (action.type) {
    case types.CONFIRM_OPEN:
      return {
        ...state,
        content: action.content,
        callback: action.callback,
        show: true,
      };
    case types.CONFIRM_CLOSE:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}