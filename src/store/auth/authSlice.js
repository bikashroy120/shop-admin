import { createSlice } from "@reduxjs/toolkit";



const getUserfromLocalStorage = localStorage.getItem("Admin")
  ? JSON.parse(localStorage.getItem("Admin"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
};


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      addUser(state, action) {
        state.user = action.payload;
      },
    },

})
export const authActions = authSlice.actions;
export default authSlice.reducer;