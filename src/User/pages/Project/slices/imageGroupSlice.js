import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch image group data
export const fetchImageGroup = createAsyncThunk(
    'imageGroup/fetchImageGroup',
    async (projectDetailId, { rejectWithValue }) => {
        try {
            if (!projectDetailId) {
                console.log('Received projectDetailId:', projectDetailId);
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

// Async thunk to fetch image translation data
export const fetchImageTranslation = createAsyncThunk(
    'imageGroup/fetchImageTranslation',
    async ({ projectId, languageCode }, { rejectWithValue }) => {
        try {
            if (!projectId || !languageCode) {
                console.log('Invalid inputs:', { projectId, languageCode });
                throw new Error('Invalid project ID or language code');
            }

            const response = await axios.get(`http://localhost:8080/image_translation/project/${projectId}/language/${languageCode}`);
            console.log('Fetched Image Translation Data:', response.data); // Log response data
            return response.data;
        } catch (error) {
            console.error('Error fetching image translation:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const imageGroupSlice = createSlice({
    name: 'imageGroup',
    initialState: {
        imageGroup: null,
        imageTranslation: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImageGroup.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchImageGroup.fulfilled, (state, action) => {
                console.log('Image Group State Update:', action.payload);
                state.loading = false;
                state.imageGroup = action.payload;
                state.error = null;
            })
            .addCase(fetchImageGroup.rejected, (state, action) => {
                console.error('Error fetching image group:', action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchImageTranslation.pending, (state) => {
                state.loading = true;
                console.log('Fetching image translation...'); // Log when fetching starts
            })
            .addCase(fetchImageTranslation.fulfilled, (state, action) => {
                console.log('Image Translation State Update:', action.payload);
                state.loading = false;
                state.imageTranslation = action.payload;
                state.error = null;
            })
            .addCase(fetchImageTranslation.rejected, (state, action) => {
                console.error('Error fetching image translation:', action.payload);
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default imageGroupSlice.reducer;
