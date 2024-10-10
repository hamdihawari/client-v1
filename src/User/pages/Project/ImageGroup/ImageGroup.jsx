import PropTypes from 'prop-types';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import { useTranslation } from "react-i18next";

const ImageGroup = ({ imageGroup }) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    // Log the imageGroup prop to see its structure
    console.log('ImageGroup Data:', imageGroup);

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
                        {image.imageSubject || `Subject not available`}
                    </p>
                </div>
            ))}
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
            })
        ).isRequired,
    }).isRequired,
};

export default ImageGroup;
