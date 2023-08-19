import React, { useContext, useState } from 'react';
import style from './style.module.css';
import { Menu } from '../Menu/Menu';
import useMediaQuery from '../../Hooks/useMediaQuery';
import SearchBar from '../SearchBar/SearchBar';
import headerStyles from './style.module.css';
import { GalleryContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export const Header = () => {
  const isLargeMobile = useMediaQuery('(max-width:991px)');
  const [searchTerm, setSearchTerm] = useState('');
  const { landscapeGallery, streetGallery, portraitGallery } = useContext(GalleryContext);
  const navigate = useNavigate();

  const customHeaderStyle = {
    form: headerStyles.customForm,
    searchbar: headerStyles.customSearchbar,
    select: headerStyles.customSelect,
    input: headerStyles.customInput,
    searchIcon: headerStyles.customSearchIcon
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
  const handleSearchInputChange = (e) => {
    const searchTermValue = e.target.value
    setSearchTerm(searchTermValue);
  };

  const handleSearch = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const hasLandscape = landscapeGallery.some(
      (val) => val.category.toLowerCase().includes(lowerSearchTerm)
    );
    const hasPortrait = portraitGallery.some(
      (val) => val.category.toLowerCase().includes(lowerSearchTerm)
    );
    const hasStreet = streetGallery.some(
      (val) => val.category.toLowerCase().includes(lowerSearchTerm)
    );

    if (hasLandscape) {
      navigate('/landscape');
      console.log('Landscape');
    } else if (hasPortrait) {
      navigate('/portrait');
      console.log('Portrait');
    } else if (hasStreet) {
      navigate('/street');
      console.log('Street');
    } else {
      console.log('No matching category found');
    }
  };

  return (
    <>
      <div className={style.header}>
        {isLargeMobile && <h4 className={style.title}>Hamdi Hawari</h4>}
        {isLargeMobile && (
          <div className={customHeaderStyle.searchbar}>
            <SearchBar onSearchBarChange={handleSearchInputChange} customStyle={customHeaderStyle} onKeyDown={handleKeyDown} />
          </div>
        )}
        {isLargeMobile && <Menu />}
        
      </div>
      {!isLargeMobile && <LanguageSwitcher />}
    </>
  )
}
