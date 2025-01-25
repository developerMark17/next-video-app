import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos:[],
    dislikesCount: 0,
}

const dislikesSlicer = createSlice({
    name: 'dislikes',
    initialState,
    reducers:{
        dislikesToSave:(state, action)=>{
            state.videos.push(action.payload);
            state.videoCount -=1;
        }
    }
});

export const {dislikesToSave} = dislikesSlicer.actions;
export default dislikesSlicer.reducer;