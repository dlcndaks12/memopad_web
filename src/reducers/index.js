import toast from './toast';
import confirm from './confirm';
import authentication from './authentication';
import progress from './progress';
import location from './location';
import category from './category';
import sideNav from './sideNav';
import { combineReducers } from 'redux';

export default combineReducers({
    toast,
    confirm,
    authentication,
    progress,
    location,
    category,
    sideNav,
});