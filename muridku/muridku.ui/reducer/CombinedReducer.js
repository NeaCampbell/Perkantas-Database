import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import KTBReducer from './KTBReducer';
import MemberReducer from './MemberReducer';

const tmpCombinedReducer = combineReducers({
  User: UserReducer,
  KTB: KTBReducer,
  Member: MemberReducer
});

const CombinedReducer = (state, action) => {
  return tmpCombinedReducer(state, action);
};

export default CombinedReducer;