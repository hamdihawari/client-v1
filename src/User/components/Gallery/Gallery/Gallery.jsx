import React, { memo, useRef, useState, useEffect } from 'react';
import style from './style.module.css';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';

import GalleryCard from '../GalleryCard/GalleryCard';

const Gallery = () => {
  const slideshowRef = useRef();
  const { _gallery } = useParams();
  const galleryUrl = `http://localhost:9000/${_gallery}`;
  const [gallery, setGallery] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios.get(galleryUrl).then((res) => {
      setGallery(res.data);
    });
  }, []);

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSlide = (currentIndex) => {
    setCurrentImageIndex(currentIndex);
  };

  return (
    <div className={style.gallery}>
      <div className={style.reactImagegallery}>
        <h1 className={style.header}></h1>
        <ImageGallery
          items={gallery}
          showPlayButton
          showFullscreenButton
          slideOnThumbnailOver
          showThumbnails
          showIndex
          showNav
          isRTL={false}
          showBullets
          originalTitle={false}
          description={false}
          disableKeyDown
          slideInterval={3000}
          slideDuration={1000}
          currentIndex={currentImageIndex}
          onSlide={handleSlide}
          startIndex={0}
        />

        <GalleryCard
          gallery={gallery}
          currentImageIndex={currentImageIndex}
          handleNextClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default memo(Gallery);

