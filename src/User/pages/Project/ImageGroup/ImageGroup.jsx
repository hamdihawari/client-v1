import PropTypes from 'prop-types';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchImageTranslation } from '../slices/imageGroupSlice'; // Passe den Pfad bei Bedarf an

const ImageGroup = ({ imageGroup, projectId }) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const languageCode = i18n.language;
    const isArabic = languageCode === 'ar';

    // Wähle imageTranslation aus dem Redux-State
    const { imageTranslation, loading, error } = useSelector((state) => state.imageGroup);

    // Übersetzungsdaten basierend auf projectId und aktueller Sprache abrufen
    useEffect(() => {
        if (projectId) {
            dispatch(fetchImageTranslation({ projectId, languageCode }));
        } else {
            console.error('projectId is undefined, cannot fetch translations');
        }
    }, [dispatch, projectId, languageCode]);

    // Debugging-Informationen für Bild-IDs und Übersetzungs-IDs
    useEffect(() => {
        if (imageGroup.images) {
            console.log('Image IDs in imageGroup:', imageGroup.images.map(img => img.id));
        }
        if (imageTranslation) {
            console.log('Translation image IDs:', imageTranslation.map(t => t.image?.id));
            console.log('Full Image Translation Data:', imageTranslation);
        }
    }, [imageGroup, imageTranslation]);

    // Lade- und Fehlerzustände
    if (loading) return <p>Loading image translations...</p>;
    if (error) return <p>Error: {error}</p>;

    // Übersetzungen der Bilder anhand der Reihenfolge zuordnen
    const getTranslationForImage = (index) => {
        if (!imageTranslation || index >= imageTranslation.length) {
            return {
                imageSubject: `No subject available for image at index ${index}`,
                imageDescription: `No description available for image at index ${index}`
            };
        }

        return imageTranslation[index];
    };

    return (
        <div className={`${style.imageGroupWrapper} ${isArabic ? rtlStyle.imageGroupWrapper : ''}`}>
                {imageGroup.images && imageGroup.images.length > 0 ? (
                    imageGroup.images.map((image, index) => {
                        const translation = getTranslationForImage(index);

                        return (
                            <div key={image.id} className={`${style.imageGroupContener} ${isArabic ? rtlStyle.imageGroupContener : ''}`}>
                                <img
                                    src={image.imagePath}
                                    alt={`Image ${image.id}`}
                                    className={`${style.images}`}
                                />
                                {translation ? (
                                    <div className={`${style.imageTranslation} ${isArabic ? rtlStyle.imageTranslation : ''}`}>
                                        <p className={`${style.imageSubject} ${isArabic ? rtlStyle.imageSubject : ''}`}>
                                            {translation.imageSubject}
                                        </p>
                                        <p className={`${style.imageDescription} ${isArabic ? rtlStyle.imageDescription : ''}`}>
                                            {translation.imageDescription}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={`${style.noTranslation} ${isArabic ? rtlStyle.noTranslation : ''}`}>
                                        <p>{`No subject available for image ID ${image.id}`}</p>
                                        <p>{`No description available for image ID ${image.id}`}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No images available for this project.</p>
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
        })
            ).isRequired,
        }).isRequired,
            projectId: PropTypes.number.isRequired,
        };

            export default ImageGroup;
