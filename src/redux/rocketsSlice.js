import { createSlice } from '@reduxjs/toolkit';

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: [],
  reducers: {
    setRockets: (state, action) => action.payload,
  },
});

export const { setRockets } = rocketsSlice.actions;
export const rocketsReducer = rocketsSlice.reducer;
