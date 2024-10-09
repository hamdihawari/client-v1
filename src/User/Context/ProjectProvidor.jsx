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
                    axiosInstance.get(`/project_details_translation`),
                    //axiosInstance.get(`/project_details_translation/project/{projectId}/language/{languageCode}`)
                ]);

                const projectCards = projectCardsResponse.data;
                const cardTranslations = cardTranslationsResponse.data;
                const projectDetails = Array.isArray(detailsResponse.data) ? detailsResponse.data : [];
                const detailsTranslations = detailsTranslationsResponse.data;

                const completeProjectData = projectCards.map(project => {
                    const cardTranslation = cardTranslations.find(t => t.projectCard.id === project.id && t.language.id === languageId) || {};

                    // Find project details and translation for this specific project
                    const projectDetail = projectDetails.find(detail => detail.projectCardId === project.id) || {};  // Corrected line
                    const detailTranslation = detailsTranslations.find(dt =>
                        dt.projectCardId === projectDetail.id &&
                        dt.language.id === languageId
                    ) || {};

                    if (Object.keys(detailTranslation).length === 0) {
                        console.warn('No matching detailTranslation found.');
                    }

                    // Console:
                    console.log('Looking for projectCardId:', projectDetail.id, 'in detailsTranslations:', detailsTranslations);
                    console.log('ProjectDetailTranslation:', detailTranslation);  // This will log an empty object if the `find()` fails
                    console.log('ProjectDetail:', projectDetail); // 200 projectCardId project_card_id
                    console.log('ProjectDetails:', projectDetails); // 200
                    console.log('ProjectDetailTranslations:', detailsTranslations); // 200
                    console.log('ProjectDetailTranslation:', detailTranslation); // 500 - Empty {}
                    console.log('See if the structure is correct:', projectDetails);  // 200
                    console.log('Language ID:', languageId); // 200
                    console.log('projectCards:', projectCards); // 200
                    console.log('Logs projectDetail object:', projectDetail); // Logs projectDetail object
                    console.log('Looking for projectCardId:', projectDetail.id, 'in detailsTranslations:', detailsTranslations);

                    /*return {
                        ...project,
                        title: cardTranslation.subject || t('defaultTitle'),
                        description: cardTranslation.description || t('defaultDescription'),
                        data: cardTranslation.data || t('defaultData'),
                        details: {
                            subjectDetails: detailsTranslations.subjectDetails || t('defaultSubjectDetails'),
                            cardDescription: detailsTranslations.cardDescription || t('defaultCardDescription')
                        }
                    };*/
                    return {
                        ...project,
                        title: cardTranslation.subject || t('defaultTitle'),
                        description: cardTranslation.description || t('defaultDescription'),
                        data: cardTranslation.data || t('defaultData'),
                        details: {
                        subjectDetails: detailsTranslations.subjectDetails || t('defaultSubjectDetails'),
                        cardDescription: detailsTranslations.cardDescription || t('defaultCardDescription')
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
