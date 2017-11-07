import {
    CATEGORY_INIT,
} from '../ActionTypes';
import axios from 'axios';

/*============================================================================
 category
 ==============================================================================*/

/* CATEGORY INIT */
export function categoryInit() {
    return (dispatch) => {
        return axios.get('/api/category')
            .then((response) => {
                if (response.result === 'OK') {
                    dispatch(category(response.data));
                }
            }).catch((error) => {
                console.log('catch', error);
            });
    }
}

export function category(category) {
    return {
        type: CATEGORY_INIT,
        category: category,
    };
}