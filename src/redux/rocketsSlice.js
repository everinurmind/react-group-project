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
  reducers: {
    addReservation: (state, action) => {
      const id = action.payload;
      const newState = state.rockets.map((rocket) => (rocket.rocket_id === id
        ? { ...rocket, reserved: true } : rocket));
      return { ...state, rockets: newState };
    },

    deleteReservation: (state, action) => {
      const id = action.payload;
      const newState = state.rockets.map((rocket) => (rocket.rocket_id === id
        ? { ...rocket, reserved: false } : rocket));
      return { ...state, rockets: newState };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => ({
        ...state, isLoading: true,
      }))
      .addCase(fetchRockets.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        rockets: payload.map((rocket) => ({
          rocket_id: rocket.rocket_id,
          rocket_name: rocket.rocket_name,
          description: rocket.description,
          flickr_images: rocket.flickr_images,
          reserved: false,
        })),
      }))
      .addCase(fetchRockets.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload.error,
      }));
  },
});

export const { addReservation, deleteReservation } = rocketsSlice.actions;
export default rocketsSlice.reducer;
