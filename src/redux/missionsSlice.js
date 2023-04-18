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
      .addCase(getMissions.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        missions: payload.map((mission) => ({
          mission_id: mission.mission_id,
          mission_name: mission.mission_name,
          description: mission.description,
        })),
      }))
      .addCase(getMissions.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload.error,
      }));
  },
});

export default missionsSlice.reducer;
