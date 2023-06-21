import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name:'img',
    initialState:{
        imageUrl:"",
        loadding:false,
        error:"",
    },
    reducers:{
        setImageUrl(state,action){
            state.imageUrl = action.payload;
        },
        setLoadding(state,action){
            state.loadding = action.payload;
        },
        setError(state,action){
            state.error = action.payload;
        },
    }
});
export const imageActions = imageSlice.actions;
export default imageSlice;