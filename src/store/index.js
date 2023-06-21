import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Cart/cart-slice";
import orderSlice from "./Order/order-slice";
import imageSlice from "./ImageUpload/image-slice"
import productSlice from "./Product/product-slice"
import authReducer from "./auth/authSlice"

const store = configureStore({
    reducer:{
        cart: cartSlice.reducer,
        order:orderSlice.reducer,
        img:imageSlice.reducer,
        product:productSlice.reducer,
        auth:authReducer
     }
});
export default store;