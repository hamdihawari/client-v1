import React, { memo, useContext, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../../Context/Context';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Portrait = () => {
  const { portraitGallery } = useContext(GalleryContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(portraitGallery[index]);
  };

  const handleImageHover = (index) => {
    setSelectedImage(portraitGallery[index]);
  };

  const handleImageLeave = () => {
    setSelectedImage(null);
  };

  return (
    <div className={style.portrait}>
      <div className={style.portraitContent}>
        <h1 className={style.header}>Landscape Gallery</h1>
        {portraitGallery.map((item, index) => (
          <div key={item.id} className={style.gallery}>
            <div
              className={style.single}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
            >
              <Link to={`/portrait/portraitImage/${index}`} onClick={() => handleImageClick(index)}>
                <img src={item.original} alt='gallery' className={style.img} />
                {selectedImage === item && (
                  <div className={style.imageOverlay}>
                    <div className={style.imageTitle}>{item.title}</div>
                    <div className={style.buttonGroup}>
                      <IconButton className={style.likeButton}>
                        <FavoriteIcon style={{ color: '#FFFFFF', fontSize: '28px' }} />
                      </IconButton>

                      <IconButton className={style.likeButton}>
                        <ThumbDownIcon style={{ color: '#FFFFFF', fontSize: '28px' }} />
                      </IconButton>
                    </div>
                    {/* <div className={style.buttonGroup}>
                    <button className={style.likeButton2} id={style.likeButton2}>Like</button>
                    <button className={style.likeButton2}>Share</button>
                    </div> */}
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

export default memo(Portrait);
