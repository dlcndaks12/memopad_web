import * as types from '../../actions/ActionTypes';

const initialState = {
    nation: null,
    city: null,
};

export default function location(state = initialState, action) {
    switch (action.type) {
        case types.LOCATION_INIT:
            return {
                ...state,
                nation: action.nation,
                city: action.city,
            };
        default:
            return state;
    }
}