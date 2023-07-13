import React, { memo, useContext, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../../Context/Context';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Street = () => {
  const { streetGallery } = useContext(GalleryContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(streetGallery[index]);
  };

  const handleImageHover = (index) => {
    setSelectedImage(streetGallery[index]);
  };

  const handleImageLeave = () => {
    setSelectedImage(null);
  };

  return (
    <div className={style.street}>
      <div className={style.streetContent}>
        <h1 className={style.header}>Street Gallery</h1>
        {streetGallery.map((item, index) => (
          <div key={item.id} className={style.gallery}>
            <div
              className={style.single}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
            >
              <Link to={`/street/streetImage/${index}`} onClick={() => handleImageClick(index)}>
                <img src={item.original} alt='gallery' className={style.img} />
                {selectedImage === item && (
                  <div className={style.imageOverlay}>
                    <div className={style.imageTitle}>{item.title}</div>
                    <div className={style.buttonGroup}>
                      <IconButton className={style.likeButton} color="white">
                        <FavoriteIcon style={{ color: '#FFFFFF', fontSize: '28px' }} />
                      </IconButton>
                      <IconButton className={style.likeButton} color="white">
                        <ThumbDownIcon style={{ color: '#FFFFFF', fontSize: '28px' }} />
                      </IconButton>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Street);
