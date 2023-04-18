import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './missionsSlice';

const store = configureStore({
  reducer: missionsReducer,
});

export default store;
