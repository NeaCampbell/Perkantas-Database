/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import KTBReducer from './KTBReducer';
import MemberReducer from './MemberReducer';
import PageReducer from './PageReducer';

const tmpCombinedReducer = combineReducers({
  User: UserReducer,
  KTB: KTBReducer,
  Member: MemberReducer,
  Page: PageReducer,
});

const CombinedReducer = (state, action) => {
  return tmpCombinedReducer(state, action);
};

export default CombinedReducer;
