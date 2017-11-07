import * as types from '../../actions/ActionTypes';

const initialState = {
  show: false,
};

export default function progress(state = initialState, action) {
  switch (action.type) {
    case types.PROGRESS_SHOW:
      return {
        ...state,
        show: true,
      };
    case types.PROGRESS_HIDE:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}