import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectDetails, fetchProjectCard, fetchProjectCardTranslation } from '../slices/projectDetailsSlice.js';
import { fetchImageGroup } from '../slices/imageGroupSlice.js';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import ImageGroup from "../ImageGroup/ImageGroup.jsx";

// eslint-disable-next-line react/prop-types
const ProjectDetails = ({ id }) => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();

    const projectDetailsId = id || 1; // Use the passed id or default to 1
    const isArabic = i18n.language === 'ar'; // Check for RTL styling

    // Fetch project details and image group data
    useEffect(() => {
        const currentLanguage = i18n.language;

        // Dispatch actions to fetch data
        dispatch(fetchProjectDetails({ projectDetailsId }));
        dispatch(fetchProjectCard(projectDetailsId));
        dispatch(fetchProjectCardTranslation({ projectCardId: projectDetailsId, languageCode: currentLanguage }));
        dispatch(fetchImageGroup(projectDetailsId)); // Fetch the image group data
    }, [dispatch, i18n.language, projectDetailsId]);

    // Select project details and image group from the Redux state
    const {
        details,
        loadingDetails,
        loadingCard,
        loadingTranslation,
        error,
        projectCard,
        projectCardTranslation,
    } = useSelector((state) => state.projectDetails);

    const { imageGroup, loadingImageGroup, imageGroupError } = useSelector((state) => state.imageGroup);

    const isLoading = loadingDetails || loadingCard || loadingTranslation || loadingImageGroup;

    // Loading state
    if (isLoading) return <p>Loading...</p>;

    // Error handling
    if (error || imageGroupError) {
        console.error('Error fetching data:', error || imageGroupError);
        return <p>Error: {error || imageGroupError}</p>;
    }

    // Ensure details, projectCard, and projectCardTranslation are available
    if (!details || !projectCard || !projectCardTranslation) {
        return <p>No project details available.</p>;
    }

    const translation = details.translations.find(t => t.language.code === i18n.language);
    const cardDescription = translation ? translation.cardDescription : 'No description available.';
    const projectImage = projectCard.image || details.image;
    const subjectDetails = translation ? translation.subjectDetails : 'No description available.';
    const { subject, data } = projectCardTranslation || {}; // Use optional chaining for safety

    console.log("ProjectDetailsTranslation", translation);

    return (
        <div className={`${style.projectDetailsWrapper} ${isArabic ? rtlStyle.projectDetailsWrapper : ''}`}>
            {projectImage ? (
                <div className={`${style.projectContainer} ${isArabic ? rtlStyle.projectContainer : ''}`}>
                    <div className={style.projectHeader}>
                        <img src={projectImage} alt={subject || 'No Subject'} className={style.thumbnail}/>
                        <div>
                            <h2 className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
                                {subject || `Title not available for Project Card ID ${projectDetailsId}`}
                            </h2>
                            <p className={`${style.data} ${isArabic ? rtlStyle.data : ''}`}>
                                {data || `Date not available`}
                            </p>
                        </div>
                    </div>
                    <img
                        src={projectImage}
                        className={style.image}
                        alt={subject || 'No Subject'}
                    />
                </div>
            ) : (
                <div className={`${style.noImageContainer} ${isArabic ? rtlStyle.noImageContainer : ''}`}>
                    <p>No project image available.</p>
                </div>
            )}

            <h2 className={`${style.subjectDetails} ${isArabic ? rtlStyle.subjectDetails : ''}`}>
                {subjectDetails || `Subject Details available for Project Card ID ${id}`}
            </h2>

            <h3 className={`${style.cardDescription} ${isArabic ? rtlStyle.cardDescription : ''}`}>
                {cardDescription || 'No description available'}
            </h3>

            <div>
                {imageGroup && Object.keys(imageGroup).length > 0 ? (
                    <ImageGroup imageGroup={imageGroup}/>
                ) : (
                    <p>No images available in the image group.</p>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;
