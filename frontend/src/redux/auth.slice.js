import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null, // Initialize from storage so login persists
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // Correctly handles {user, token} from login OR just user from profile update
            const userData = action.payload?.user || action.payload;
            const tokenData = action.payload?.token || state.token;

            state.user = userData;
            state.token = tokenData;

            // Save token to persist login session on refresh
            if (tokenData) {
                localStorage.setItem("token", tokenData);
            }
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token"); // Clear storage on logout
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;