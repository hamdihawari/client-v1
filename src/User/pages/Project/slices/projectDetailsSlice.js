// src/User/pages/Project/slices/projectDetailsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

// Fetch project details for a specific project ID
export const fetchProjectDetails = createAsyncThunk(
    'projectDetails/fetchProjectDetails',
    async ({ projectDetailsId }) => {
        try {
            const response = await axiosInstance.get(`/project_details/${projectDetailsId}`);
            return response.data; // Expecting an object with project details
        } catch (error) {
            // Log detailed error info
            console.error('Error fetching project details:', error.response ? error.response.data : error.message);
            throw error; // Rethrow to let Redux handle the rejected state
        }
    }
);

// Fetch project card details for a specific project card ID
export const fetchProjectCard = createAsyncThunk(
    'projectDetails/fetchProjectCard',
    async (projectCardId) => {
        try {
            const response = await axiosInstance.get(`/project_card/${projectCardId}`);
            return response.data; // Expecting an object with project card details
        } catch (error) {
            console.error('Error fetching project card:', error.response ? error.response.data : error.message);
            throw error; // Rethrow for Redux to handle it
        }
    }
);

// Fetch project card translation for a specific project card ID and language
export const fetchProjectCardTranslation = createAsyncThunk(
    'projectDetails/fetchProjectCardTranslation',
    async ({ projectCardId, languageCode }) => {
        try {
            const response = await axiosInstance.get(`/project_card_translation/project/${projectCardId}/language/${languageCode}`);
            return response.data; // Expecting an object with project card translation
        } catch (error) {
            console.error('Error fetching project card translation:', error.response ? error.response.data : error.message);
            throw error; // Rethrow for Redux to handle it
        }
    }
);

const projectDetailsSlice = createSlice({
    name: 'projectDetails',
    initialState: {
        details: null,
        projectCard: null,
        projectCardTranslation: null,
        loadingDetails: false,
        loadingCard: false,
        loadingTranslation: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectDetails.pending, (state) => {
                state.loadingDetails = true;
                state.error = null; // Reset error state
            })
            .addCase(fetchProjectDetails.fulfilled, (state, action) => {
                state.details = action.payload;
                console.log('Fetched project details:', action.payload); // Add this line

                state.loadingDetails = false;
            })
            .addCase(fetchProjectDetails.rejected, (state, action) => {
                console.error('Error fetching project details:', action.error);
                state.error = action.error.response ? action.error.response.data : action.error.message;
                state.loadingDetails = false;
            })
            .addCase(fetchProjectCard.pending, (state) => {
                state.loadingCard = true;
                state.error = null; // Reset error state
            })
            .addCase(fetchProjectCard.fulfilled, (state, action) => {
                state.projectCard = action.payload;
                state.loadingCard = false;
            })
            .addCase(fetchProjectCard.rejected, (state, action) => {
                console.error('Error fetching project card:', action.error);
                state.error = action.error.response ? action.error.response.data : action.error.message;
                state.loadingCard = false;
            })
            .addCase(fetchProjectCardTranslation.pending, (state) => {
                state.loadingTranslation = true;
                state.error = null; // Reset error state
            })
            .addCase(fetchProjectCardTranslation.fulfilled, (state, action) => {
                state.projectCardTranslation = action.payload;
                state.loadingTranslation = false;
            })
            .addCase(fetchProjectCardTranslation.rejected, (state, action) => {
                console.error('Error fetching project card translation:', action.error);
                state.error = action.error.response ? action.error.response.data : action.error.message;
                state.loadingTranslation = false;
            });
    },
});

export default projectDetailsSlice.reducer;

