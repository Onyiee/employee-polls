import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    authedUser: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action)=> {
            state.authedUser = action.payload;
        },
        logout: (state)=> {
            state.authedUser = null;
        },
    },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;