/* eslint-disable prettier/prettier */
import { SET_SELECTED_MEMBER } from './action/ActionConst';

const selectedMember = {};

const MemberReducer = (state = selectedMember, action) => {
  switch (action.type) {
    case SET_SELECTED_MEMBER:
      state = action.member;
      return state;
    default:
      return state;
  }
};

export default MemberReducer;
