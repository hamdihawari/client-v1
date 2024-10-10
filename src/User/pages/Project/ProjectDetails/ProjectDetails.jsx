import {useDispatch, useSelector} from 'react-redux';
import {fetchProjectDetails, fetchProjectCard, fetchProjectCardTranslation} from '../slices/projectDetailsSlice.js';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    const {
        details,
        loadingDetails,
        loadingCard,
        loadingTranslation,
        error,
        projectCard,
        projectCardTranslation
    } = useSelector((state) => state.projectDetails);

    const projectDetailsId = 1; // Adjust as needed
    const projectCardId = projectDetailsId; // Assuming they are the same

    // Determine if the current language is Arabic for RTL styling
    const isArabic = i18n.language === 'ar';

    useEffect(() => {
        const currentLanguage = i18n.language;
        console.log(`Fetching project details for ID: ${projectDetailsId} and language: ${currentLanguage}`);

        // Fetch the necessary details
        dispatch(fetchProjectDetails({projectDetailsId})); // Pass an object as expected by thunk
        dispatch(fetchProjectCard(projectCardId));
        dispatch(fetchProjectCardTranslation({projectCardId, languageCode: currentLanguage}));
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

    // Extract the required fields from projectCardTranslation
    const { subject, data, description } = projectCardTranslation;

    return (
        <div key={projectImage.id} className={`${style.projectDetailsWrapper} ${isArabic ? rtlStyle.projectDetailsWrapper : ''}`}>
            {projectImage && (
                <div className={`${style.projectContainer} ${isArabic ? rtlStyle.projectContainer : ''}`}>

                    <div className={`${style.projectHeader}`}>
                        <img src={projectImage} alt={subject || 'No Subject'} className={style.thumbnail}/>

                        <div>
                            <h2 className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
                                {subject || `Title not available for Project Card ID ${projectCardId}`}
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
                            // style={{width: '80%', height: 'auto'}}
                        />
                </div>
            )}
            <h2 className={`${style.subjectDetails} ${isArabic ? rtlStyle.subjectDetails : ''}`}>
                {subject || `Subject not available for Project Card ID ${projectCardId}`}
            </h2>

            <h3 className={`${style.cardDescription} ${isArabic ? rtlStyle.cardDescription : ''}`}>
                {cardDescription || `No description available`}
            </h3>
        </div>
    );
};

export default ProjectDetails;

