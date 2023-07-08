import {createSlice} from '@reduxjs/toolkit'
const userListSlice = createSlice({
    name:"userList",
    initialState:{
        userList:null,
        isFetching:false,
        error:false
    },
    reducers:{
        userListStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        userListSuccess: (state, action) => {
            state.isFetching = false;
            state.userList = action.payload;
            state.error = false;
        },
        userListFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        }
    })

export const {userListStart, userListSuccess, userListFailure} = userListSlice.actions;
export default userListSlice.reducer;