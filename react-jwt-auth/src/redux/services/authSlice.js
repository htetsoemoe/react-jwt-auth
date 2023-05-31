import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
};

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            console.log(state.user, state.token);
        },
    },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;