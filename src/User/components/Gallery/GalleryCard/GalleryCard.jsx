// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import style from './style.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import axios from 'axios';
import { IconButton } from '@mui/material';
import rtlStyle from './rtl.module.css'
import { Comments } from '../../Comment/Comments/Comments';
// import CommentStyles from './style.module.css';

// eslint-disable-next-line react/prop-types
const GalleryCard = ({ gallery, currentImageIndex, currentUserId }) => {
  if (!gallery || gallery.length === 0) {
    return null;
  }
  const val = gallery[currentImageIndex];
  if (!val) {
    return null;
  }

  const { id, title, taken, uploaded, camera, objective, category } = val;
  const [likeCount, setLikeCount] = useState(0);
  const { isArabic } = useContext(ProjectContext);

  // POST LIKE //
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
    <>
      <div className={`${style.card} ${isArabic && rtlStyle.card}`}>
        <div className={`${style.cardContent} ${isArabic && rtlStyle.cardContent}`}>
          <div className={`${style.cardLeft} ${isArabic && rtlStyle.cardLeft}`}>
            <div className={style.cardHeader}>
              <IconButton className={style.iconsLink} onClick={handleLikeClick}  >
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
                <h2 className={style.title}>{title}</h2>
                <h4 className={`${style.cameraInfo} ${isArabic && rtlStyle.cameraInfo}`}>Taken: {taken} - Uploaded: {uploaded}</h4>
                <h4 className={style.cameraInfo} id={style.cameraInfo}>
                  <CameraAltIcon id={style.contentIcons} />
                  {camera}
                </h4>
                <h4 className={style.cameraInfo} id={style.cameraInfo}>
                  <CameraIcon id={style.contentIcons} />
                  {objective}
                </h4>
                <h4 className={style.cameraInfo} id={style.category}>
                  Category: {category}
                </h4>
                <h4 className={style.cameraInfo} id={style.like}>
                  {likeCount} people liked this photo
                </h4>
              </nav>
            </ul>
          </div>
          <div className={`${style.cardRight} ${isArabic && rtlStyle.cardRight}`}>
            <Comments imageID={val.id} currentUserId="1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryCard;