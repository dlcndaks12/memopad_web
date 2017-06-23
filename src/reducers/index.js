import toast from './toast';
import authentication from './authentication';
import { combineReducers } from 'redux';

export default combineReducers({
  toast,
  authentication,
});