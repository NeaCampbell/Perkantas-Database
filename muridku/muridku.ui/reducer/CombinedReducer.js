import { combineReducers } from 'redux';
import PageStylesReducer from './style-reducer/PageStylesReducer';

const tmpCombinedReducer = combineReducers({
  PageStyles: PageStylesReducer
});

const CombinedReducer = (state, action) => {
  return tmpCombinedReducer(state, action);
};

export default CombinedReducer;