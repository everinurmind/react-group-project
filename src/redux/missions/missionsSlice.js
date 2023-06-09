import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  missions: [],
  isLoading: false,
  error: '',
};

export const getMissions = createAsyncThunk('missions/getMissions', async () => {
  const response = await fetch('https://api.spacexdata.com/v3/missions');
  const data = await response.json();
  return data;
});

export const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, { payload }) => ({
      ...state,
      missions: state.missions.map((mission) => {
        if (mission.mission_id === payload) return { ...mission, reserved: true };
        return mission;
      }),
    }),
    leaveMission: (state, { payload }) => ({
      ...state,
      missions: state.missions.map((mission) => {
        if (mission.mission_id === payload) return { ...mission, reserved: false };
        return mission;
      }),
    }),
  },

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
          url: mission.wikipedia,
        })),
      }))
      .addCase(getMissions.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }));
  },
});

export const { joinMission, leaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;
