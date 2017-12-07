import { combineReducers } from 'redux';
import toast from './toast';
import confirm from './confirm';
import sideNav from './sideNav';
import progress from './progress';
import auth from './auth';
import location from './location';
import category from './category';
import og from './og';
import scrap from './scrap';
import layout from './layout';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    toast,
    confirm,
    sideNav,
    progress,
    auth,
    location,
    category,
    og,
    scrap,
    layout,
    pender: penderReducer,
});