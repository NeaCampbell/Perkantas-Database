import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PageStylesReducer from './style-reducer/PageStylesReducer';

const tmpCombinedReducer = combineReducers({
  User: UserReducer,
  PageStyles: PageStylesReducer
});

const CombinedReducer = (state, action) => {
  return tmpCombinedReducer(state, action);
};

export default CombinedReducer;