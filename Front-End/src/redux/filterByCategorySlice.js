import {createSlice} from '@reduxjs/toolkit'
const categorySlice = createSlice({
    name:"category",
    initialState:{
        category:null,
        isFetching:false,
        error:false
    },
    reducers:{
        categoryStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        categorySuccess: (state, action) => {
            state.isFetching = false;
            state.category = action.payload;
            state.error = false;
        },
        categoryFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        }
    })

export const {categoryStart, categorySuccess, categoryFailure} = categorySlice.actions;
export default categorySlice.reducer;