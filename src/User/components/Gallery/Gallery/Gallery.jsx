import React, { memo, useRef, useState, useEffect } from 'react';
import style from './style.module.css';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';

import GalleryCard from '../GalleryCard/GalleryCard';

const Gallery = () => {
  const slideshowRef = useRef();
  const { _gallery, index } = useParams(); // Get the index parameter from the URL
  const galleryUrl = `http://localhost:9000/${_gallery}`
  const [gallery, setGallery] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(parseInt(index, 10));
  const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
    axios.get(galleryUrl).then((res) => {
      setGallery(res.data);
    });
  }, [_gallery]);
 

  const handleSlide = (currentIndex) => {
    setCurrentImageIndex(currentIndex);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setSelectedIndex(index);
  };
  return (
    <div className={style.gallery}>
      <div className={style.reactImagegallery}>
        <h1 className={style.header}></h1>
        <ImageGallery
          items={gallery}
          showPlayButton // true to display a play button for autoplaying the 
          showFullscreenButton  //true to display a fullscreen button for expanding the gallery to fullscreen mode.
          slideOnThumbnailOver //true to enable sliding to the next/previous image when hovering over the thumbnails.
          showThumbnails //true to display thumbnail images for navigating through the gallery.
          showIndex //true to display the index (current image number) in the gallery.
          showNav //true to display the navigation arrows for moving to the next/previous image.
          isRTL={false} //true to enable right-to-left mode for the gallery.
          showBullets //true to display bullets for navigating through the gallery.
          originalTitle={false} //false to hide the title of the images.
          description={false} //false to hide the description of the images.
          disableKeyDown  //true to disable keyboard navigation for the gallery.
          slideInterval={3000} //This attribute sets the duration (in milliseconds) between each automatic slide when autoplaying the gallery.
          slideDuration={1000} //This attribute sets the duration (in milliseconds) of the sliding animation when transitioning between images.
          currentIndex={currentImageIndex} //This attribute sets the initial index of the currently displayed image in the gallery.
          onSlide={handleSlide} //This attribute specifies a callback function that is called when a slide (image transition) occurs in the gallery. The function receives the index of the current slide as an argument.
          startIndex={selectedIndex} //This attribute sets the initial index of the thumbnail that is displayed as active.
          onClick={(e) => handleImageClick(parseInt(e.target.dataset.index, 10))} //This attribute specifies a callback function that is called when an image is clicked. The function receives an event object and can be used to perform custom actions when an image is clicked. 
          />

        <GalleryCard
          gallery={gallery}
          currentImageIndex={currentImageIndex}
        />
      </div>
    </div>
  );
};

export default memo(Gallery);
