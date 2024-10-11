import PropTypes from 'prop-types';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {fetchImageTranslation} from '../slices/imageGroupSlice.js'; // Adjust the path as necessary

const ImageGroup = ({imageGroup, projectId}) => {
    const {i18n} = useTranslation();
    const dispatch = useDispatch();
    const isArabic = i18n.language === 'ar';

    // Select imageTranslation from Redux state
    const {imageTranslation, loading, error} = useSelector((state) => state.imageGroup);

    // Log the imageGroup prop to see its structure
    console.log('ImageGroup Data:', imageGroup);

    // Fetch image translation data based on projectId and current language
    useEffect(() => {
        const languageCode = i18n.language; // Get the current language code
        if (projectId) {
            console.log(`Fetching image translation for projectId: ${projectId} and languageCode: ${languageCode}`);
            dispatch(fetchImageTranslation({projectId, languageCode}));
        } else {
            console.log('projectId is undefined');
        }
    }, [dispatch, projectId, i18n.language]);

    // Log imageTranslation state
    useEffect(() => {
        console.log('Image Translation Data from Redux:', imageTranslation);
    }, [imageTranslation]); // Log whenever imageTranslation changes

    if (loading) {
        return <p>Loading image translations...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={style.imageGroupWrapper}>
            {imageGroup.images && imageGroup.images.map((image) => {
                // Ensure imageTranslation is an array and contains data
                const translation = Array.isArray(imageTranslation)
                    ? imageTranslation.find(t => t.imageId === image.id)
                    : null;  // Fallback if imageTranslation is null or not an array

                return (
                    <div key={image.id} className={style.imageContainer}>
                        <img
                            src={image.imagePath}
                            alt={`Image ${image.id}`}
                            className={style.images}
                        />
                        {/* Render image translations if available */}
                        {Array.isArray(imageTranslation) && imageTranslation.length > 0 ? (
                            imageTranslation.map(translation => (
                                <div key={translation.id}
                                     className={`${style.imageTranslation} ${isArabic ? rtlStyle.imageTranslation : ''}`}>
                                    <p>{translation.imageSubject || `Translation subject not available`}</p>
                                    <p>{translation.imageDescription || `Translation description not available`}</p>
                                </div>
                            ))
                        ) : (
                            <p>No image translation data available.</p>
                        )}
                    </div>
                );
            })}


        </div>
    );
};

ImageGroup.propTypes = {
    imageGroup: PropTypes.shape({
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                imagePath: PropTypes.string.isRequired,
                imageSubject: PropTypes.string,
                imageDescription: PropTypes.string, // Ensure this is defined
            })
        ).isRequired,
    }).isRequired,
    projectId: PropTypes.number.isRequired, // Ensure projectId is passed
};

export default ImageGroup;

/*
<p className={`${style.imageSubject} ${isArabic ? rtlStyle.imageSubject : ''}`}>
    {translation ? translation.imageSubject : image.imageSubject || `Subject not available`}
</p>
<p className={`${style.imageDescription} ${isArabic ? rtlStyle.imageDescription : ''}`}>
    {translation ? translation.imageDescription : image.imageDescription || `Description not available`}
</p>

/*
import PropTypes from 'prop-types';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchImageTranslation } from '../slices/imageGroupSlice.js'; // Adjust the path as necessary

const ImageGroup = ({ imageGroup, projectId }) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const isArabic = i18n.language === 'ar';

    // Select imageTranslation from Redux state
    const { imageTranslation, loading, error } = useSelector((state) => state.imageGroup);

    // Log the imageGroup prop to see its structure
    console.log('ImageGroup Data:', imageGroup);

    // Fetch image translation data based on projectId and current language
    useEffect(() => {
        const languageCode = i18n.language; // Get the current language code
        if (projectId) {
            console.log(`Fetching image translation for projectId: ${projectId} and languageCode: ${languageCode}`);
            dispatch(fetchImageTranslation({ projectId, languageCode }));
        } else {
            console.log('projectId is undefined');
        }
    }, [dispatch, projectId, i18n.language]);

    // Log imageTranslation state
    useEffect(() => {
        console.log('Image Translation Data from Redux:', imageTranslation);
    }, [imageTranslation]); // Log whenever imageTranslation changes

    if (loading) {
        return <p>Loading image translations...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={style.imageGroupWrapper}>
            {imageGroup.images && imageGroup.images.map((image) => (
                <div key={image.id} className={style.imageContainer}>
                    <img
                        src={image.imagePath}
                        alt={`Image ${image.id}`}
                        className={style.images}
                    />
                    <p className={`${style.imageSubject} ${isArabic ? rtlStyle.imageSubject : ''}`}>
                        // here imageSubject please
                    </p>
                    <p className={`${style.imageDescription} ${isArabic ? rtlStyle.imageDescription : ''}`}>
                        // here imageDescription please
                    </p>
                    {/!*{image.imageDescription && (
                        <p className={`${style.imageDescription} ${isArabic ? rtlStyle.imageDescription : ''}`}>
                            {image.imageDescription || `Description not available`}
                        </p>
                    )}*!/}
                </div>
            ))}

            {/!* Render image translations if available *!/}
            {imageTranslation && imageTranslation.length > 0 ? (
                imageTranslation.map(translation => (
                    <div key={translation.id} className={`${style.imageTranslation} ${isArabic ? rtlStyle.imageTranslation : ''}`}>
                        <p>{translation.imageSubject || `Translation subject not available`}</p>
                        <p>{translation.imageDescription || `Translation description not available`}</p>
                    </div>
                ))
            ) : (
                <p>No image translation data available.</p>
            )}
        </div>
    );
};

ImageGroup.propTypes = {
    imageGroup: PropTypes.shape({
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                imagePath: PropTypes.string.isRequired,
                imageSubject: PropTypes.string,
                imageDescription: PropTypes.string, // Ensure this is defined
            })
        ).isRequired,
    }).isRequired,
    projectId: PropTypes.number.isRequired, // Ensure projectId is passed
};

export default ImageGroup;
*/
