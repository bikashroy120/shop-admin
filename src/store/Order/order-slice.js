import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{
        Items:[],
        Query:[],
        Users:[],
    },
    reducers:{
        orderItems(state,action){
            state.Items = action.payload;
        },
        queryItems(state,action){
            state.Query = action.payload;
        },
       

        usersItems(state,action){
            state.Users = action.payload;
        },
    }
});
export const orderActions = orderSlice.actions;
export default orderSlice;