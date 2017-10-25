import * as types from '../actions/ActionTypes';

const initialState = {
    message: '',
    time: 0,
    regDate: null,
};

export default function toast(state = initialState, action) {
    switch (action.type) {
        case types.TOAST:
            return {
                ...state,
                message: action.message,
                time: action.time,
                regDate: Date.now(),
            };
        default:
            return state;
    }
}