import * as types from '../actions/ActionTypes';

const initialState = {
    nation: null,
    locations: null,
};

export default function location(state = initialState, action) {
    switch (action.type) {
        case types.LOCATION_INIT:
            return {
                ...state,
                nation: action.nation,
                locations: action.locations,
            };
        default:
            return state;
    }
}