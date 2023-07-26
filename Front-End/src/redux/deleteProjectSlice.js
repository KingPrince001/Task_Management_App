import {createSlice} from '@reduxjs/toolkit'
const deleteProjectSlice = createSlice({
    name:"deleteProject",
    initialState:{
        deleteProject:null,
        isFetching:false,
        error:false
    },
    reducers:{
        deleteProjectStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProjectSuccess: (state, action) => {
            state.isFetching = false;
            state.deleteProject = action.payload;
            state.error = false;
        },
        deleteProjectFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        }
    })

export const {deleteProjectStart, deleteProjectSuccess, deleteProjectFailure} = deleteProjectSlice.actions;
export default deleteProjectSlice.reducer;