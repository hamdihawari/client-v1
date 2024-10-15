// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import axios from 'axios';
import { IconButton } from '@mui/material';
import rtlStyle from './rtl.module.css';
import { Comments } from '../../Comment/Comments/Comments';
import { useTranslation } from 'react-i18next';

const GalleryCard = ({ gallery, currentImageIndex }) => {
  const { i18n } = useTranslation();
  const [likeCount, setLikeCount] = useState(0);
  const isArabic = i18n.language === 'ar';

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const val = gallery[currentImageIndex];
  if (!val) {
    return null;
  }

  const { id, title, taken, uploaded, camera, objective, category } = val;

  const handleLikeClick = () => {
    axios
        .patch(`http://localhost:9000/landscapeImage/${id}`, {
          likes: likeCount + 1,
        })
        .then((response) => {
          if (response.status === 200) {
            setLikeCount(likeCount + 1);
          }
        })
        .catch((error) => {
          console.error('Error occurred while updating the like count:', error);
        });
  };

  return (
      <div className={`${style.card} ${isArabic && rtlStyle.card}`}>
        <div className={`${style.cardContent} ${isArabic && rtlStyle.cardContent}`}>
          <div className={`${style.cardLeft} ${isArabic && rtlStyle.cardLeft}`}>
            <div className={style.cardHeader}>
              <IconButton className={style.iconsLink} onClick={handleLikeClick}>
                <FavoriteBorderIcon style={{ color: '#000000', fontSize: '28px' }} />
              </IconButton>
              <IconButton className={style.iconsLink}>
                <ShareIcon style={{ color: '#000000', fontSize: '28px' }} />
              </IconButton>
              <IconButton className={style.iconsLink}>
                <MoreHorizIcon style={{ color: '#000000', fontSize: '28px' }} />
              </IconButton>
            </div>
            <ul>
              <nav className={`${style.cardBody} ${isArabic && rtlStyle.cardBody}`}>
                <h2 className={style.title}>
                  {i18n.language === 'ar' ? title.ar : i18n.language === 'de' ? title.de : title.en}
                </h2>
                <h4 className={`${style.cameraInfo} ${isArabic && rtlStyle.cameraInfo}`}>
                  {i18n.language === 'ar' ? 'التقاط' : i18n.language === 'de' ? 'Aufgenommen' : 'Taken'}: {taken} - {i18n.language === 'ar' ? 'تم التحميل' : i18n.language === 'de' ? 'Hochgeladen' : 'Uploaded'}: {uploaded}
                </h4>
                <h4 className={style.cameraInfo} id={style.cameraInfo}>
                  <CameraAltIcon id={style.contentIcons} />
                  {camera}
                </h4>
                <h4 className={style.cameraInfo} id={style.cameraInfo}>
                  <CameraIcon id={style.contentIcons} />
                  {objective}
                </h4>
                <h4 className={style.cameraInfo} id={style.category}>
                  {i18n.language === 'ar' ? 'الفئة' : i18n.language === 'de' ? 'Kategorie' : 'Category'}: {category}
                </h4>
                <h4 className={style.cameraInfo} id={style.like}>
                  {likeCount} {i18n.language === 'ar' ? 'أحب الناس هذه الصورة' : i18n.language === 'de' ? 'Leute mochten dieses Foto' : 'people liked this photo'}
                </h4>
              </nav>
            </ul>
          </div>
          <div className={`${style.cardRight} ${isArabic && rtlStyle.cardRight}`}>
            <Comments imageID={val.id} currentUserId="1" />
          </div>
        </div>
      </div>
  );
};


GalleryCard.propTypes = {
  gallery: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        taken: PropTypes.string.isRequired,
        uploaded: PropTypes.string.isRequired,
        camera: PropTypes.string.isRequired,
        objective: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      })
  ).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
};

export default GalleryCard;
