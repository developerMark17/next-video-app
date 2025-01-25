import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  likesCount: 0,
};

const likesSlicer = createSlice({
  name: "likes",
  initialState,
  reducers: {
    likesToSave: (state, action) => {
      state.videos.push(action.payload);
      state.videosCount +=1;
    },
  },
});

export const { likesToSave } = likesSlicer.actions;
export default likesSlicer.reducer;
