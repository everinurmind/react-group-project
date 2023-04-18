import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './missionsSlice';
import rocketsReducer from './rocketsSlice';

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    rockets: rocketsReducer,
  },
});

export default store;
