import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    project: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    projectStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    projectSuccess: (state, action) => {
      state.isFetching = false;
      state.project = action.payload;
      state.error = false;
    },
    projectFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { projectStart, projectSuccess, projectFailure } = projectSlice.actions;
export default projectSlice.reducer;
