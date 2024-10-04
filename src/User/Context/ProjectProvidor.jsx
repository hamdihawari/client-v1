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
    const { i18n, t } = useTranslation(); // Added t for i18n fallback text support

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
                // Fetch project cards and translations in parallel
                const [projectCardsResponse, translationsResponse] = await Promise.all([
                    axiosInstance.get(`/project_card`),
                    axiosInstance.get(`/project_card_translation`)
                ]);

                const projectCards = projectCardsResponse.data;
                const translations = translationsResponse.data;

                // Combine project cards with their translations
                const completeProjectData = projectCards.map(project => {
                    const translation = translations.find(t => t.projectCard.id === project.id && t.language.id === languageId);
                    return {
                        ...project,
                        title: translation ? translation.subject : t('defaultTitle'), // Use i18n fallback title
                        description: translation ? translation.description : t('defaultDescription'), // Use i18n fallback description
                    };
                });

                // Only set state if the component is still mounted
                if (isMounted) {
                    setProjects(completeProjectData);
                }
            } catch (err) {
                if (isMounted) {
                    setError(t('fetchError', { message: err.message })); // i18n for error messages
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
    }, [languageId, t]); // Added t as a dependency to avoid issues with changing languages

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

