import React, { useContext, useState } from 'react';
import style from './style.module.css';
import Select from "react-select";
import SearchIcon from '@mui/icons-material/Search';
import { GalleryContext } from '../../Context/Context';
import { IconButton } from '@mui/material';

const SearchBar = ({ onSearchBarChange, customStyle, onCityChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { landscapeGallery } = useContext(GalleryContext);
  const { streetGallery } = useContext(GalleryContext);
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchBarChange(searchTerm);
  };

  const handleInputChange = (e) => {
    const searchTermValue = e.target.value;
    onSearchBarChange(e); // Call the prop function passed from the parent component
    setSearchTerm(searchTermValue);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption ? selectedOption.value : ''); // Update the selectedCity state
    onCityChange(selectedOption ? selectedOption.value : ''); // Optional: Call the onCityChange prop with the selected city value
  };

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#000000" : "",
        color: isSelected ? "#FFFFFF" : isFocused ? "#FFFFFF" : null,
      };
    }
  };

  // Get unique city names using a Set
  const uniqueCities = [...new Set([...landscapeGallery.map(item => item.city), ...streetGallery.map(item => item.city)])];

  // Create the options array with unique city names
  const options = uniqueCities.map(city => ({ value: city, label: city }));

  return (
    <form className={`${style.form} ${customStyle?.form}`} onSubmit={handleSearchSubmit}>
      <div className={`${style.searchbar} ${customStyle?.searchbar}`}>
        <Select
          name="text"
          className={`${style.select} ${customStyle?.select}`}
          value={selectedCity}
          onChange={handleCityChange}
          options={options}
          placeholder="City"
          isClearable={true}
          styles={colourStyles}
        />
        <div className={style.input}>
          <input type="search" placeholder="Search" name="search" value={searchTerm} onChange={handleInputChange} autoFocus={true} />
          <IconButton className={style.searchIcon}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;