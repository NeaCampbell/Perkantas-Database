import { SET_SELECTED_KTB } from "./action/ActionConst";

const selectedKtb = {}

const KTBReducer = (state = selectedKtb, action) => {
  switch (action.type) {
    case SET_SELECTED_KTB:
      state = action.ktb;
      return state;
    default:
      return state;
  };
};

export default KTBReducer;