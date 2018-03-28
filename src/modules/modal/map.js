import { createAction, handleActions } from 'redux-actions';

const MAP_OPEN = "modal/MAP_OPEN";
const MAP_CLOSE = "modal/MAP_CLOSE";

/*============================================================================
 Action
 ===========================================================================*/
/**
 * @param title:String
 * @param latitude:Float
 * @param longitude:Float
 */
export const mapOpen = createAction(MAP_OPEN);

/**
 * @param void
 */
export const mapClose = createAction(MAP_CLOSE);

/*============================================================================
 Default State
 ===========================================================================*/
const initialState = {
    status: false,
    title: '',
    latitude: 10.10,
    longitude: 10.10,
};

/*============================================================================
 Reducer
 ===========================================================================*/
export default handleActions({
    [MAP_OPEN]: (state, action) => {
        return {
            ...state,
            status: true,
            title: action.payload.title,
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
        }
    },
    [MAP_CLOSE]: (state) => {
        return {
            ...state,
            status: false,
        }
    },
}, initialState);