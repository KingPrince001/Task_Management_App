import { createSlice } from '@reduxjs/toolkit';

const updateMembersAssignedSlice = createSlice({
  name: 'updateMembersAssigned',
  initialState: {
    updateMembersAssigned: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    updateMembersAssignedStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateMembersAssignedSuccess: (state, action) => {
      state.isFetching = false;
      state.updateMembersAssigned = action.payload;
      state.error = false;
    },
    updateMembersAssignedFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { updateMembersAssignedStart, updateMembersAssignedSuccess, updateMembersAssignedFailure } = updateMembersAssignedSlice.actions;
export default updateMembersAssignedSlice.reducer;
