import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rocketsReducer } from './rocketsSlice';
import missionsReducer from './missionsSlice';

const rootReducer = combineReducers({
  rockets: rocketsReducer,
  missions: missionsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

export default store;
