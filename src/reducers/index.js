import toast from './toast';
import authentication from './authentication';
import progress from './progress';
import location from './location';
import { combineReducers } from 'redux';

export default combineReducers({
    toast,
    authentication,
    progress,
    location,
});