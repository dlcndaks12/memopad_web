import * as types from '../../actions/ActionTypes';

const initialState = {
    category: null,
};

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.CATEGORY_INIT:
            return {
                ...state,
                category: action.category,
            };
        default:
            return state;
    }
}