// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectCardReducer from '../User/pages/Project/slices/projectCardSlice.js';
import projectDetailsReducer from '../User/pages/Project/slices/projectDetailsSlice.js'; // Add this line
import imageGroupReducer from '../User/pages/Project/slices/imageGroupSlice.js';
const store = configureStore({
    reducer: {
        projectDetails: projectDetailsReducer,
        projectCards: projectCardReducer, // If you use this in other components
        imageGroup: imageGroupReducer,
    },
});

export { store };