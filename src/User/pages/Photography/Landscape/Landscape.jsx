import React, { memo, useContext, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../../Context/Context';

const Landscape = () => {
  const { landscapeGallery } = useContext(GalleryContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(landscapeGallery[index]);
  };

  return (
    <>
        <div className={style.landscape}>
      <div className={style.landscapeContent}>
        <h1 className={style.header}>Landscape Gallery</h1>
        {landscapeGallery.map((item, index) => (
          <div key={item.id} className={style.gallery}>
            <div className={style.single}>
              <Link to={`/landscape/landscapeImage/${index}`} onClick={() => handleImageClick(index)}>
                <img src={item.original} alt='gallery' id={style.img} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className={style.selectedImage}>
          <img src={selectedImage.original} alt='selected' />
        </div>
      )}
    </div>
    </>
  );
};

export default memo(Landscape);
