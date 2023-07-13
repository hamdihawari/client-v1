import React, { useState } from 'react';
import style from './style.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import axios from 'axios';
import { IconButton } from '@mui/material';

const GalleryCard = ({ gallery, currentImageIndex }) => {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  const val = gallery[currentImageIndex];
  const { id, title, taken, uploaded, camera, objective, category } = val;
  const [likeCount, setLikeCount] = useState(0);

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
    <div className={style.card}>
      <div className={style.cardHeader}>
        <IconButton className={style.iconsLink} onClick={handleLikeClick}  >
          <FavoriteBorderIcon style={{ color: '#000000', fontSize: '28px' }} />
        </IconButton>
        <IconButton className={style.iconsLink}>
          <ShareIcon style={{ color: '#000000', fontSize: '28px' }}/>
        </IconButton>
        <IconButton className={style.iconsLink}>
          <MoreHorizIcon style={{ color: '#000000', fontSize: '28px' }}/>
        </IconButton>
      </div>
      <div className={style.cardContent}>
        <ul>
          <nav className={style.cardBody}>
            <h2 className={style.title}>{title}</h2>
            <h4 className={style.cameraInfo}>Taken: {taken} - Uploaded: {uploaded}</h4>
            <h4 className={style.cameraInfo} id={style.cameraInfo}>
              <CameraAltIcon id={style.contentIcons} />
              {camera}
            </h4>
            <h4  className={style.cameraInfo} id={style.cameraInfo}>
              <CameraIcon id={style.contentIcons} />
              {objective}
            </h4>
            <h4  className={style.cameraInfo} id={style.category}>
            Category: {category}
            </h4>
            <h4 className={style.cameraInfo}  id={style.like}>{likeCount} people liked this photo</h4>
          </nav>
        </ul>
      </div>
    </div>
  );
};

export default GalleryCard;