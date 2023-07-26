import {createSlice} from '@reduxjs/toolkit'
const updateProjectSlice = createSlice({
    name:"updateProject",
    initialState:{
        updateProject:null,
        isFetching:false,
        error:false
    },
    reducers:{
        updateProjectStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProjectSuccess: (state, action) => {
            state.isFetching = false;
            state.updateProject = action.payload;
            state.error = false;
        },
        updateProjectFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        }
    })

export const {updateProjectStart, updateProjectSuccess, updateProjectFailure} = updateProjectSlice.actions;
export default updateProjectSlice.reducer;