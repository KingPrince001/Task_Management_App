import {createSlice} from '@reduxjs/toolkit'
const urgencySlice = createSlice({
    name:"urgency",
    initialState:{
        urgency:null,
        isFetching:false,
        error:false
    },
    reducers:{
        urgencyStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        urgencySuccess: (state, action) => {
            state.isFetching = false;
            state.urgency = action.payload;
            state.error = false;
        },
        urgencyFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        }
    })

export const {urgencyStart, urgencySuccess, urgencyFailure} = urgencySlice.actions;
export default urgencySlice.reducer;