import toast from './toast';
import authentication from './authentication';
import progress from './progress';
import { combineReducers } from 'redux';

export default combineReducers({
  toast,
  authentication,
  progress,
});