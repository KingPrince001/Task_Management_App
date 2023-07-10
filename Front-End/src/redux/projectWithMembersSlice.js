import {createSlice} from '@reduxjs/toolkit'
const projectWithMembersSlice = createSlice({
    name:"projectWithMembers",
    initialState:{
        projectWithMembers:null,
        isFetching:false,
        error:false
    },
    reducers:{
        projectWithMembersStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        projectWithMembersSuccess: (state, action) => {
            state.isFetching = false;
            state.projectWithMembers = action.payload;
            state.error = false;
        },
        projectWithMembersFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        }
    })

export const {projectWithMembersStart, projectWithMembersSuccess, projectWithMembersFailure} = projectWithMembersSlice.actions;
export default projectWithMembersSlice.reducer;