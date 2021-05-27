/* eslint-disable prettier/prettier */
import { SET_USER } from './action/ActionConst';

const user = {};

const UserReducer = (state = user, action) => {
  switch (action.type) {
    case SET_USER:
      state = action.user;
      return state;
    default:
      return state;
  }
};

export default UserReducer;
