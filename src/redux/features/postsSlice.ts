// postsSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface PostsState {
  refetchFunction: Function | null;
}

const initialState: PostsState = {
  refetchFunction: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setRefetchFunction(state, action) {
      state.refetchFunction = action.payload;
    },
  },
});

export const { setRefetchFunction } = postsSlice.actions;

export default postsSlice.reducer;
