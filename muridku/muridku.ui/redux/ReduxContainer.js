import { createStore } from 'redux';
import CombinedReducer from '../reducer/CombinedReducer';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: localStorage,
  // version: 0,
  // migrate: createMigrate({ 0: state => initialState }, { debug: false })
}
  
const customCreateStore = (initialState = {}) => {
  const persistedReducer = persistReducer(persistConfig, CombinedReducer);

  const store = createStore(
    persistedReducer,
    initialState
  );
  
  const persistor = persistStore(store);
  return { store, persistor };
}

const initialState = {};

export const { store, persistor } = customCreateStore(initialState);