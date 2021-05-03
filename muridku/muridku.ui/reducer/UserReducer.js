import { SET_USER } from "./action/ActionConst";

const user = {
  email: ""
}

const UserReducer = (state = user, action) => {
    switch (action.type) {
      case SET_USER:
        state.email = action;
        return action;
      default:
        return state;
    };
  };
  
  export default UserReducer;