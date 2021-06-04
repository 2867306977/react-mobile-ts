import { combineReducers } from 'redux';
// const initUsers = [1, 2, 3];
function users(prevState = 0, action: any) {
  switch (action.type) {
    case 'USERS':
      return prevState;
    default:
      return prevState;
  }
}
export default combineReducers({
  users,
});
