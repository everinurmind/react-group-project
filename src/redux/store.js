import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rocketsReducer } from './rocketsSlice';

const rootReducer = combineReducers({
  rockets: rocketsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
