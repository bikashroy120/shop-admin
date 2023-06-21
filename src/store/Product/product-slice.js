import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        productCategory:[],
        productBrand:[],
        loadding:false,
        error:"",
    },
    reducers:{
        setProductItem(state,action){
            state.products = action.payload;
        },
        setProductBrand(state,action){
            state.productBrand = action.payload;
        },
        setProductCategory(state,action){
            state.productCategory = action.payload;
        },
    }
});
export const productActions = productSlice.actions;
export default productSlice;