import { createSlice } from '@reduxjs/toolkit';

const assignMembersSlice = createSlice({
  name: 'assignMembers',
  initialState: {
    assignedMembers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    assignMembersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    assignMembersSuccess: (state, action) => {
      state.isFetching = false;
      state.assignedMembers = action.payload;
      state.error = false;
    },
    assignMembersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  assignMembersStart,
  assignMembersSuccess,
  assignMembersFailure,
} = assignMembersSlice.actions;
export default assignMembersSlice.reducer;
