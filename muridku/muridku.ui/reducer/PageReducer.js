/* eslint-disable prettier/prettier */
import { SET_CURRENT_PAGE } from './action/ActionConst';

const pages = [
  {id: 1, name: 'LoginScreen', backid: 1},
  {id: 2, name: 'RegisterScreen', backid: 1},
  {id: 3, name: 'ViewAllKTBScreen', backid: 3},
  {id: 4, name: 'ViewDataKTBScreen', backid: 3},
  {id: 5, name: 'EntryDataAKKScreen', backid: 4},
  {id: 6, name: 'UpdateKTBScreen', backid: 3},
  {id: 7, name: 'UpdateDataKTBScreen', backid: 3},
  {id: 8, name: 'AddKTBHistoryScreen', backid: 4},
];

const page = {
  RootLockedPage: 'LoginScreen',
  RootUnlockedPage: 'ViewAllKTBScreen',
  LastPage: 'LoginScreen',
  CurrentPage: 'LoginScreen',
  Pages: pages,
};

const PageReducer = (state = page, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      state.LastPage = state.CurrentPage;
      state.CurrentPage = action.page;
      return state;
    default:
      return state;
  }
};

export default PageReducer;
