import { SET_USER } from "./action/ActionConst";

const user = {
  email: "",
  memberId: 0
}

const UserReducer = (state = user, action) => {
    switch (action.type) {
      case SET_USER:
        state.email = action;
        state.memberId = action;
        return action;
      default:
        return state;
    };
  };
  
  export default UserReducer;