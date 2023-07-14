import React, { memo, useContext, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../../Context/Context';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Portrait = () => {
  const { portraitGallery } = useContext(GalleryContext);

  return (
    <div className={style.portrait}>
      <div className={style.portraitContent}>
        <h1 className={style.header}>Landscape Gallery</h1>
        {portraitGallery.map((item, index) => (
          <div key={item.id} className={style.gallery}>
            <div className={style.single}>
              <Link to={`/portrait/portraitImage/${index}`}>
                <img src={item.original} alt='gallery' className={style.img} />
              </Link>
            </div>

         
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Portrait);