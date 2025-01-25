import { configureStore } from '@reduxjs/toolkit'
import videoSlicer from '../../app/slicer/video-slicer';
import likesSlicer from '../../app/slicer/likes-slicer';
import dislikesSlicer from '../../app/slicer/dislike-slicer';
export const store = configureStore({
  reducer: {
    store: videoSlicer,
    likesSlicer,dislikesSlicer
  }
})