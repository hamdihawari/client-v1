import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch image group data
export const fetchImageGroup = createAsyncThunk(
    'imageGroup/fetchImageGroup',
    async (projectDetailId, { rejectWithValue }) => {
        try {
            if (!projectDetailId) {
                console.error('Received projectDetailId:', projectDetailId);
                throw new Error('projectDetailId is missing');
            }

            const response = await axios.get(`http://localhost:8080/image_group/${projectDetailId}`);
            console.log('Fetched Image Group Data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching image group:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Language ID mapping
const languageIdMap = {
    en: 1,
    de: 2,
    ar: 3,
    // Add more mappings as needed
};

// Async thunk to fetch image translation data
export const fetchImageTranslation = createAsyncThunk(
    'imageGroup/fetchImageTranslation',
    async ({ projectId, languageCode }, { rejectWithValue }) => {
        try {
            if (!projectId || !languageCode) {
                console.error('Invalid inputs:', { projectId, languageCode });
                throw new Error('Invalid project ID or language code');
            }

            // Map language code to corresponding ID
            const languageId = languageIdMap[languageCode] || 1; // Default to 1 if not found

            console.log(`Fetching image translation for Project ID: ${projectId}, Language Code: ${languageCode}`);

            const response = await axios.get(`http://localhost:8080/image_translation/language_id/${languageId}?image_id=${projectId}`);
            console.log('Fetched Image Translation Data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching image translation:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create the slice
const imageGroupSlice = createSlice({
    name: 'imageGroup',
    initialState: {
        imageGroup: [],
        imageTranslation: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImageGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('Fetching image group...');
            })
            .addCase(fetchImageGroup.fulfilled, (state, action) => {
                console.log('Image Group State Update:', action.payload);
                state.loading = false;
                state.imageGroup = action.payload;
            })
            .addCase(fetchImageGroup.rejected, (state, action) => {
                console.error('Error fetching image group:', action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchImageTranslation.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('Fetching image translation...');
            })
            .addCase(fetchImageTranslation.fulfilled, (state, action) => {
                console.log('Image Translation State Update:', action.payload);
                state.loading = false;
                state.imageTranslation = action.payload;
            })
            .addCase(fetchImageTranslation.rejected, (state, action) => {
                console.error('Error fetching image translation:', action.payload);
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer
export default imageGroupSlice.reducer;
