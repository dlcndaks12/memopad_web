import {
    SCRAP_LIST,
    SCRAP_LIST_SUCCESS,
    SCRAP_LIST_FAILURE,
    SCRAP_SET_LIST_CONDITION
} from '../ActionTypes';
import axios from 'axios';

/*============================================================================
 scrap
 ==============================================================================*/

export function scrapSetListCondition(scrapListCondition) {
    return {
        type: SCRAP_SET_LIST_CONDITION,
        scrapListCondition: scrapListCondition,
    }
}

/* SCRAP LIST */
export function requestScrapList() {
    return (dispatch, getState) => {
        const state = getState().scrap;
        console.log(state);
        dispatch(scrapList());

        const nationCode = state.scrapListCondition.nationCode;
        const limit = state.scrapListCondition.limit;
        const page = state.scrapListCondition.page;
        let city = state.scrapListCondition.city !== 'none' ? state.scrapListCondition.city === 'all' ? null : state.scrapListCondition.city.toString() : -1;
        let category = state.scrapListCondition.category !== 'none' ? state.scrapListCondition.category === 'all' ? null : state.scrapListCondition.category.toString() : -1;

        console.log('nationCode', nationCode);
        console.log('city', city);
        console.log('category', category);
        console.log('limit', limit);
        console.log('page', page);

        return axios.get('/api/scrap', {
            params: {
                nationCode: nationCode,
                cityIdx: city,
                categoryIdx: category,
                limit: limit,
                page: page,
            },
        }).then((response) => {
            if (response.result === 'OK') {
                console.log(response);
                dispatch(scrapListSuccess(response.data.list));
            } else {
                dispatch(scrapListFailure(response.message));
            }
        }).catch((error) => {
            console.log('catch', error);
        });
    };
}

export function scrapList() {
    return {
        type: SCRAP_LIST,
    };
}

export function scrapListSuccess(list) {
    return {
        type: SCRAP_LIST_SUCCESS,
        list: list,
    };
}

export function scrapListFailure(message) {
    return {
        type: SCRAP_LIST_FAILURE,
        message: message,
    };
}