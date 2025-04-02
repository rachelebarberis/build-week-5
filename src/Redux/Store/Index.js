import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authentication from '../Reducers/Auth';
import puppiesActions from '../Reducers/Puppies';

const mainReducer = combineReducers({
  auth: authentication,
  puppies: puppiesActions,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
