import { combineReducers } from 'redux';
import toast from './toast';
import confirm from './confirm';
import sideNav from './sideNav';
import progress from './progress';
import authentication from './authentication';
import location from './location';
import category from './category';
import scrap from './scrap';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    toast,
    confirm,
    sideNav,
    progress,
    authentication,
    location,
    category,
    scrap,
    pender: penderReducer,
});