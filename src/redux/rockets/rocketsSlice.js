import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  rockets: [],
  isLoading: false,
  error: '',
};

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await fetch('https://api.spacexdata.com/v3/rockets');
  const data = await response.json();
  return data;
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
      .addCase(fetchRockets.fulfilled, (state, { payload }) => {
        const updatedRockets = payload.map((payload) => {
          const rocket = state.rockets.find((state) => state.rocket_id
          === payload.rocket_id);
          return {
            ...payload,
            reserved: rocket?.reserved ?? false,
          };
        });
        return {
          ...state,
          isLoading: false,
          rockets: updatedRockets,
        };
      })
      .addCase(fetchRockets.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload.error,
      }));
  },
});

export const { addReservation, deleteReservation } = rocketsSlice.actions;
export default rocketsSlice.reducer;
