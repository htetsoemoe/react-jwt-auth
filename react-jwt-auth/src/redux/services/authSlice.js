import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    user: null,
    token: null
};

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        // addUser used in pages/Login.jsx
        addUser: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            // After login user and token add to global states
            // we need to store in browser cookie
            Cookies.set("user", JSON.stringify(state.user));
            Cookies.set("token", state.token); // no need to stringify 'state.toke'
        },
        // removeUserCookie used in pages/Navbar.jsx
        removeUserCookie: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("user");
            Cookies.remove("token");
        }
    },
});

export const { addUser, removeUserCookie } = authSlice.actions;
export default authSlice.reducer;