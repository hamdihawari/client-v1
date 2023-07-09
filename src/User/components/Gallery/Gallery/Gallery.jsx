import React, { memo, useRef, useState, useEffect } from 'react';
import style from './style.module.css';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';

import GalleryCard from '../GalleryCard/GalleryCard';

const Gallery = () => {
  const slideshowRef = useRef();
  const { gallery } = useParams();
  const landscapeImageUrl = `http://localhost:9000/${gallery}`;
  const [landscapeGallery, setLandscapeGallery] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dynamicIndex, setDynamicIndex] = useState(2); 

  useEffect(() => {
    axios.get(landscapeImageUrl).then((res) => {
      setLandscapeGallery(res.data);
    });
  }, []);

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === landscapeGallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={style.gallery}>
      <div className={style.reactImagegallery}>
        <h1 className={style.header}>GALLERY</h1>
        <ImageGallery
          items={landscapeGallery}
          /* ref={slideshowRef} */
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
          onSlide={handleNextClick}
          startIndex={0}
        />

        <GalleryCard
          landscapeGallery={landscapeGallery}
          currentImageIndex={currentImageIndex}
          handleNextClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default memo(Gallery);

/* const slideshowref = useRef()
const playSlides = () => {
    slideshowref.current.play()
}
const stopPlaySlides = () => {
    slideshowref.current.pause()
} */
{/* <div className={style.slideControlBtn}>
    <Button variant="contained" id={style.play} onClick={playSlides}>Play Slideshow</Button>
    <Button variant="contained" color="error" id={style.pause} onClick={stopPlaySlides}>Stop Slideshow</Button>
</div> */}