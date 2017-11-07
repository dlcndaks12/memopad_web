import * as types from '../../actions/ActionTypes';

const initialState = {
    isOpen: false,
};

export default function sideNav(state = initialState, action) {
    switch (action.type) {
        case types.SIDE_NAV_OPEN:
            return {
                ...state,
                isOpen: true,
            };
      case types.SIDE_NAV_CLOSE:
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
}