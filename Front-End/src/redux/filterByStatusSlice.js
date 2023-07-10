import {createSlice} from '@reduxjs/toolkit'
const statusSlice = createSlice({
    name:"status",
    initialState:{
        status:null,
        isFetching:false,
        error:false
    },
    reducers:{
        statusStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        statusSuccess: (state, action) => {
            state.isFetching = false;
            state.status = action.payload;
            state.error = false;
        },
        statusFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        }
    })

export const {statusStart, statusSuccess, statusFailure} = statusSlice.actions;
export default statusSlice.reducer;