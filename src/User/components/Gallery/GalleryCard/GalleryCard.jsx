import React from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';

const GalleryCard = ({ gallery, currentImageIndex, handleNextClick }) => {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  const val = gallery[currentImageIndex];
  const { id, title, taken, uploaded, camera, objective } = val;

  return (
    <div className={style.card}>
      <div className={style.cardHeader}>
        <Link className={style.iconsLink}>
          <FavoriteBorderIcon />
        </Link>
        <Link className={style.iconsLink}>
          <ShareIcon />
        </Link>
        <Link className={style.iconsLink}>
          <MoreHorizIcon />
        </Link>
      </div>
      <div className={style.cardContent}>
        <ul>
          <nav className={style.cardBody}>
            <h2>{title}</h2>
            <h5>
              Taken: {taken} - Uploaded: {uploaded}
            </h5>
            <h5 id={style.contentheader}>
              <CameraAltIcon id={style.contentIcons} />
              {camera}
            </h5>
            <h5 id={style.contentheader}>
              <CameraIcon id={style.contentIcons} />
              {objective}
            </h5>
          </nav>
        </ul>
      </div>
    </div>
  );
};

export default GalleryCard;