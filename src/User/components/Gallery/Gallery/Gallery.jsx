import React, { memo, useRef, useState, useEffect } from 'react';
import style from './style.module.css';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Link, useParams } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import ShareIcon from '@mui/icons-material/Share';

const Gallery = () => {
  const slideshowRef = useRef();
  const { gallery } = useParams();
  const landscapeImageUrl = `http://localhost:9000/${gallery}`;
  const [landscapeGallery, setLandscapeGallery] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          ref={slideshowRef}
          showPlayButton
          showFullscreenButton
          slideOnThumbnailOver
          showThumbnails
          showIndex
          showNav // Enable default navigation
          isRTL={false}
          showBullets
          originalTitle={false}
          description={false}
          disableKeyDown
          slideInterval={3000}
          slideDuration={1000}
          currentIndex={currentImageIndex} // Pass the current image index as a prop
          onSlide={handleNextClick} // Call handleNextClick on slide change
        />

        <div className={style.card}>
          <div className={style.cardHeader}>
            <Link className={style.iconsLink}>
              <FavoriteBorderIcon  />
            </Link>
            <Link className={style.iconsLink}>
              <ShareIcon />
            </Link>
            <Link className={style.iconsLink}>
              <MoreHorizIcon />
            </Link>
          </div>
          {landscapeGallery.map((val, index) => (
            <div key={val.id}>
              {index === currentImageIndex && (
                <div className={style.cardContent}>
                  <ul>
                    <nav className={style.cardBody}>
                      <h2>{val.title}</h2>
                      <h5>
                        Taken: {val.taken} - Uploaded: {val.uploaded}
                      </h5>
                      <h5 id={style.contentheader}>
                        <CameraAltIcon id={style.contentIcons} />
                        {val.camera}
                      </h5>
                      <h5 id={style.contentheader}>
                        <CameraIcon id={style.contentIcons} />
                        {val.objective}
                      </h5>
                    </nav>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
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