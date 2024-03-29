// eslint-disable-next-line no-unused-vars
import React, { memo, useContext, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../../Context/Context';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import useMediaQuery from '../../../Hooks/useMediaQuery';
import SearchBar from '../../../components/SearchBar/SearchBar';
import {ScrollToTopButton} from '../../../components/ScrollToTopButton/ScrollToTopButton'
import rtlStyle from './rtl.module.css'
import { Paginate } from '../../../components/Paginate/Paginate';

// eslint-disable-next-line react-refresh/only-export-components
const Portrait = () => {
  const { portraitGallery, isArabic } = useContext(GalleryContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const isLargeMobile = useMediaQuery('(min-width:992px)'); // Laptop 
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination setup
  const itemsPerPage = 9 // Adjust this based on your requirements
  const totalItems = portraitGallery.length // Total number of items you're paginating
  const pageCount = Math.ceil(totalItems / itemsPerPage) /* calculates the total number of pages needed for pagination based on the total number of items and the number of items to display per page. */
  const [currentPage, setCurrentPage] = useState(0)
  // Calculate the start and end indexes of items for the current page
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  // Get the projects for the current page
  const portraitGalleryToShow = portraitGallery.slice(startIndex, endIndex) /* used to create a subset of the original list of projects that should be displayed on the current page of your pagination. */

  const handleImageClick = (index) => {
    setSelectedImage(portraitGallery[index]);
  };

  const handleImageHover = (index) => {
    setSelectedImage(portraitGallery[index]);
  };

  const handleImageLeave = () => {
    setSelectedImage(null);
  };
  const handleSearchInputChange = (e) => {
    const searchTermValue = e.target.value;
    setSearchTerm(searchTermValue);
  };

  // FILTER
  const filteredGallery = portraitGalleryToShow.filter(
    (val) =>
      (searchTerm === '' || val.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCity === '' || val.city === selectedCity)
  );

  return (
    <div className={style.portrait}>
      <div className={`${style.portraitHeader} ${isArabic && rtlStyle.portraitHeader}`}>
        {portraitGallery.map(val =>{
          return<h1 key={val.id} className={`${style.header} ${isArabic && rtlStyle.header}`}>{val.headerTitle} {val.smile}</h1>
        })}
        {isLargeMobile && <SearchBar onSearchBarChange={handleSearchInputChange} /* customStyle={customHeaderStyle} */ onCityChange={setSelectedCity} />}
      </div>
      <div className={style.portraitContent}>
        {portraitGalleryToShow.map((item, index) => (
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
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
      <Paginate pageCount={pageCount} onPageChange={handlePageChange} itemsPerPage={8}/>
    </div>
  );
};

export default memo(Portrait);

