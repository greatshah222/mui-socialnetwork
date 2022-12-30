import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // these are function responsible for modifying initial state stated above

        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("user friends non-existent");
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((el) => {
                if (el._id === action.payload.post_id) {
                    // if it matches id we change post detail
                    return action.payload.post;
                } else {
                    // else no match return original
                    return post;
                }
            });

            state.posts = updatedPosts;
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;
