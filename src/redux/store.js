import AsyncStorage from '@react-native-async-storage/async-storage';
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducers from './reducer';

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    AsyncStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  debug: true,
};

const middleware = [thunk];
const reducers = persistCombineReducers(config, rootReducers);

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    console.log('action.type', action.type);
      return reducers(undefined, action);
  }
  return reducers(state, action);
};

const enhancers  = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
const store = createStore(rootReducer, undefined, compose(...enhancers));
store.subscribe(() => saveToLocalStorage(store.getState()));
const persistor = persistStore(store, persistConfig, () => {
});
const configureStore = () => {
  return { persistor, store };
};


export default configureStore;

