
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectDetails, fetchProjectCard, fetchProjectCardTranslation } from '../slices/projectDetailsSlice.js';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const { details, loadingDetails, loadingCard, loadingTranslation, error, projectCard, projectCardTranslation } = useSelector((state) => state.projectDetails);

    const projectDetailsId = 1; // Adjust as needed
    const projectCardId = projectDetailsId; // Assuming they are the same

    useEffect(() => {
        const currentLanguage = i18n.language;
        console.log(`Fetching project details for ID: ${projectDetailsId} and language: ${currentLanguage}`);

        // Fetch the necessary details
        dispatch(fetchProjectDetails({ projectDetailsId })); // Pass an object as expected by thunk
        dispatch(fetchProjectCard(projectCardId));
        dispatch(fetchProjectCardTranslation({ projectCardId, languageCode: currentLanguage }));
    }, [dispatch, i18n.language, projectDetailsId, projectCardId]);

    // Combine loading states
    const isLoading = loadingDetails || loadingCard || loadingTranslation;

    if (isLoading) return <p>Loading...</p>;

    if (error) {
        console.error('Fetch error:', error);
        return <p>Error: {error}</p>; // More descriptive error message
    }

    if (!details || !projectCard || !projectCardTranslation) {
        return <p>No project details available.</p>;
    }

    // Find the translation for the current language
    const translation = details.translations.find(t => t.language.code === i18n.language);
    const cardDescription = translation ? translation.cardDescription : 'No description available.';

    // Ensure you are fetching the image from projectCard
    const projectImage = projectCard.image || details.image; // Adjust according to your API response

    return (
        <div>
            {projectImage && (
                <img
                    src={projectImage}
                    alt={projectCardTranslation.subject || 'No Subject'}
                    style={{width: '100%', height: 'auto'}}
                />
            )}
            <h2>{projectCardTranslation.subject || `Subject not available for Project Card ID ${projectCardId}`}</h2>
            {details.path && (
                <a href={details.path} target="_blank" rel="noopener noreferrer">
                    Go to Project
                </a>
            )}
            <h3>
                {cardDescription}
            </h3>
        </div>
    );
};

export default ProjectDetails;