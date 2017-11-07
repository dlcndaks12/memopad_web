import toast from './component/toast';
import confirm from './component/confirm';
import authentication from './component/authentication';
import progress from './component/progress';
import location from './component/location';
import category from './component/category';
import sideNav from './component/sideNav';
import scrap from './page/scrap';
import { combineReducers } from 'redux';

export default combineReducers({
    toast,
    confirm,
    authentication,
    progress,
    location,
    category,
    sideNav,
    scrap,
});