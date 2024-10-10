import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch project cards
export const fetchProjectCards = createAsyncThunk('projectCards/fetchProjectCards', async () => {
    const response = await fetch('http://localhost:8080/project_card');
    if (!response.ok) {
        throw new Error('Failed to fetch project cards');
    }
    return await response.json();
});

// Async thunk to fetch project card translations based on project ID and language code
export const fetchProjectCardTranslations = createAsyncThunk(
    'projectCards/fetchProjectCardTranslations',
    async ({ projectId, languageCode }) => {
        const response = await fetch(`http://localhost:8080/project_card_translation/project/${projectId}/language/${languageCode}`);
        if (!response.ok) {
            throw new Error('Failed to fetch translations');
        }
        const data = await response.json();

        // Log the fetched data for debugging
        console.log("Fetched translations:", data);

        // If the data is a single object, return it directly; otherwise, return an array
        return Array.isArray(data) ? data : [data]; // Ensure response is an array
    }
);

const projectCardSlice = createSlice({
    name: 'projectCards',
    initialState: {
        cards: [],
        translations: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectCards.fulfilled, (state, action) => {
                state.loading = false;
                state.cards = action.payload;
            })
            .addCase(fetchProjectCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProjectCardTranslations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectCardTranslations.fulfilled, (state, action) => {
                state.loading = false;
                // Ensure translations are stored correctly
                const projectId = action.meta.arg.projectId; // Get project ID from the meta argument
                const translationsArray = Array.isArray(action.payload) ? action.payload : [];

                state.translations[projectId] = translationsArray.reduce((acc, translation) => {
                    acc[translation.language.code] = {
                        subject: translation.subject,
                        data: translation.data,
                        description: translation.description,
                    }; // Store translation by language code
                    return acc;
                }, {});
            })
            .addCase(fetchProjectCardTranslations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default projectCardSlice.reducer;