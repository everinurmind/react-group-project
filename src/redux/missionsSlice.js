import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  missions: [],
  isLoading: false,
  error: '',
};

export const getMissions = createAsyncThunk('missions/getMissions', async () => {
  const response = await axios.get('https://api.spacexdata.com/v3/missions');
  return response.data;
});

export const missionsSlice = createSlice({
  name: 'missions',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getMissions.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getMissions.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        missions: action.payload,
      }))
      .addCase(getMissions.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }));
  },
});

export default missionsSlice.reducer;
