import * as types from 'actions/ActionTypes';

const initialState = {
    scrapList: {
        status: 'INIT',
        message: '',
        list: [],
    },
    scrapListCondition: {
        nationCode: 'kr',
        city: 'all',
        category: 'all',
        limit: 10,
        page: 1,
    }
};

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.SCRAP_SET_LIST_CONDITION:
            return {
                ...state,
                scrapListCondition: {
                    ...state.scrapListCondition,
                    ...action.scrapListCondition,
                },
            };
        case types.SCRAP_LIST:
            return {
                ...state,
                scrapList: {
                    ...state.scrapList,
                    status: 'WAITING',

                }
            };
        case types.SCRAP_LIST_SUCCESS:
            return {
                ...state,
                scrapList: {
                    ...state.scrapList,
                    status: 'SUCCESS',
                    list: action.list,
                }
            };
        case types.SCRAP_LIST_FAILURE:
            return {
                ...state,
                scrapList: {
                    ...state.scrapList,
                    status: 'FAILURE',
                    message: action.message,
                }
            };
        default:
            return state;
    }
}