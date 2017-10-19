import toast from './toast';
import confirm from './confirm';
import authentication from './authentication';
import progress from './progress';
import location from './location';
import { combineReducers } from 'redux';

export default combineReducers({
    toast,
    confirm,
    authentication,
    progress,
    location,
});