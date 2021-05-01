import { SET_USER } from "./action/ActionConst";

const user = {
  email: ""
}

const UserReducer = (state = user, action) => {
    console.log("action");
    console.log(action.email);
    console.log(state);
    switch (action.type) {
      case SET_USER:
        state.email = action;
        return action;
      default:
        return state;
    };
  };
  
  export default UserReducer;