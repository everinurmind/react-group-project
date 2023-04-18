import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  isLoading: false,
  error: '',
};

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await axios.get('https://api.spacexdata.com/v3/rockets');
  return response.data;
});

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchRockets.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        rockets: payload.map((rocket) => ({
          rocket_id: rocket.rocket_id,
          rocket_name: rocket.rocket_name,
          description: rocket.description,
          flickr_images: rocket.flickr_images,
        })),
      }))
      .addCase(fetchRockets.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload.error,
      }));
  },
});

export default rocketsSlice.reducer;
