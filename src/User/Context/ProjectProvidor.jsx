import { useState, useEffect, useMemo, createContext } from 'react';
import axiosInstance from '../services/axiosConfig.js';
import { useTranslation } from 'react-i18next';

// Context
export const ProjectContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;

    // Memoized language ID to avoid unnecessary re-renders
    const languageId = useMemo(() => {
        const languageMap = { en: 1, de: 2, ar: 3 };
        return languageMap[currentLanguage] || 1; // Default to English
    }, [currentLanguage]);

    useEffect(() => {
        let isMounted = true;

        const fetchProjectData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [
                    projectCardsResponse,
                    cardTranslationsResponse,
                    detailsResponse,
                    detailsTranslationsResponse
                ] = await Promise.all([
                    axiosInstance.get(`/project_card`),
                    axiosInstance.get(`/project_card_translation`),
                    axiosInstance.get(`/project_details`),
                    axiosInstance.get(`/project_details_translation`)
                ]);

                // Log the responses
                console.log('ProjectCard Response:', projectCardsResponse);
                console.log('ProjectCardTranslations Response:', cardTranslationsResponse);
                console.log('ProjectDetails Response:', detailsResponse);
                console.log('ProjectDetailsTranslations Response:', detailsTranslationsResponse);

                const projectCards = projectCardsResponse.data;
                const cardTranslations = cardTranslationsResponse.data;
                const projectDetails = Array.isArray(detailsResponse.data) ? detailsResponse.data : [];
                const detailsTranslations = detailsTranslationsResponse.data;

                // Complete project data by mapping over projectCards
                // Combine project cards, translations, details, and details translations
                const completeProjectData = projectCards.map(project => {
                    // Find project card translation
                    const cardTranslation = cardTranslations.find(t => t.projectCard.id === project.id && t.language.id === languageId) || {};

                    // Find related project details
                    const projectDetail = projectDetails.find(detail => detail.project_card_id === project.id);
                    const detailTranslation = projectDetail ? detailsTranslations.find(dt => dt.project_details_id === projectDetail.id && dt.language_id === languageId) || {} : {};

                    return {
                        ...project,
                        title: cardTranslation.subject || t('defaultTitle'),
                        description: cardTranslation.description || t('defaultDescription'),
                        data: cardTranslation.data || t('defaultData'),

                        details: {
                            ...projectDetail,  // Ensure this merges in all fields from projectDetail
                            subjectDetails: detailTranslation.subjectDetails || t('defaultSubjectDetails'),
                            cardDescription: detailTranslation.cardDescription || t('defaultCardDescription'),
                        }
                    };
                });

                // Only set state if the component is still mounted
                if (isMounted) {
                    setProjects(completeProjectData);
                }
            } catch (err) {
                if (isMounted) {
                    setError(t('fetchError', { message: err.message }));
                    console.error('Fetch Error:', err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProjectData();

        return () => {
            isMounted = false;
        };
    }, [languageId, t]);

    // Memoizing context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        projects,
        loading,
        error,
        languageId,
    }), [projects, loading, error, languageId]);

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};



/*
import { useState, useEffect, useMemo, createContext } from 'react';
import axiosInstance from '../services/axiosConfig.js';
import { useTranslation } from 'react-i18next';

// Context
export const ProjectContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { i18n, t } = useTranslation();

    const currentLanguage = i18n.language;

    // Memoized language ID to avoid unnecessary re-renders
    const languageId = useMemo(() => {
        const languageMap = { en: 1, de: 2, ar: 3 };
        return languageMap[currentLanguage] || 1; // Default to English
    }, [currentLanguage]);

    useEffect(() => {
        let isMounted = true; // Helps prevent state updates if the component is unmounted

        const fetchProjectData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch project cards, translations, details, and details translations in parallel
                const [projectCardsResponse, cardTranslationsResponse, detailsResponse, detailsTranslationsResponse] = await Promise.all([
                    axiosInstance.get(`/project_card`),
                    axiosInstance.get(`/project_card_translation`),
                    axiosInstance.get(`/project_details`),
                    axiosInstance.get(`/project_details_translation`)
                ]);

                console.log('Project Cards:', projectCardsResponse.data);
                console.log('Card Translations:', cardTranslationsResponse.data);
                console.log('Project Details:', detailsResponse.data);
                console.log('Details Translations:', detailsTranslationsResponse.data);

                const projectCards = projectCardsResponse.data;
                const cardTranslations = cardTranslationsResponse.data;
                const projectDetails = Array.isArray(detailsResponse.data) ? detailsResponse.data : [];
                const detailsTranslations = detailsTranslationsResponse.data;

                // Combine project cards, translations, details, and details translations
                const completeProjectData = projectCards.map(project => {
                    // Find project card translation
                    const cardTranslation = cardTranslations.find(t => t.projectCard.id === project.id && t.language.id === languageId) || {};

                    // Find related project details
                    const projectDetail = projectDetails.find(detail => detail.project_card_id === project.id);
                    const detailTranslation = projectDetail ? detailsTranslations.find(dt => dt.project_details_id === projectDetail.id && dt.language_id === languageId) || {} : {};

                    // Log the current merging process for debugging
                    console.log('Merging Data for Project:', project);
                    console.log('Card Translation:', cardTranslation);
                    console.log('Project Detail:', projectDetail);
                    console.log('Detail Translation:', detailTranslation);

                    return {
                        ...project,
                        title: cardTranslation.subject || t('defaultTitle'), // Fallback title
                        description: cardTranslation.description || t('defaultDescription'), // Fallback description
                        details: {
                            subjectDetails: detailTranslation.subject_details || t('defaultSubjectDetails'), // Fallback subject details
                            cardDescription: detailTranslation.card_description || t('defaultCardDescription') // Fallback card description
                        }
                    };
                });

                // Only set state if the component is still mounted
                if (isMounted) {
                    setProjects(completeProjectData);
                }
            } catch (err) {
                if (isMounted) {
                    setError(t('fetchError', { message: err.message }));
                    console.error('Fetch Error:', err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProjectData();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        };
    }, [languageId, t]);

    // Memoizing context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        projects,
        loading,
        error,
        languageId,
    }), [projects, loading, error, languageId]);

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};
*/