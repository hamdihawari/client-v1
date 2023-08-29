import React, { useContext, useState } from 'react'
import style from './style.module.css'
import Select from "react-select"
import SearchIcon from '@mui/icons-material/Search'
import { GalleryContext } from '../../Context/Context'
import { IconButton } from '@mui/material'

const SearchBar = ({ onSearchBarChange, customStyle, onCityChange, onKeyDown }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { landscapeGallery, streetGallery, portraitGallery } = useContext(GalleryContext)
  const [selectedCity, setSelectedCity] = useState('')

  // Get unique city names using a Set
  const uniqueCities = [...new Set([...landscapeGallery.map(item => item.city), ...portraitGallery.map(item => item.city), ...streetGallery.map(item => item.city)])]

  // Create the options array with unique city names
  const options = uniqueCities.map(city => ({ value: city, label: city }))

  // Customize the no options message
  const customNoOptionsMessage = () => "No options available, select City"

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
    setSelectedCity(selectedOption ? selectedOption.value : '') // Update the selectedCity state
    onCityChange(selectedOption ? selectedOption.value : '') // Optional: Call the onCityChange prop with the selected city value
  };

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#000000" : "",
        color: isSelected ? "#FFFFFF" : isFocused ? "#FFFFFF" : null,
      }
    }
  };

  return (
    <form className={`${style.form} ${customStyle?.form}`} onSubmit={handleSearchSubmit}>
      <div className={`${style.searchbar} ${customStyle?.searchbar}`}>
        <Select
          name="search"
          className={`${style.select} ${customStyle?.select}`}
          value={options.find((options) => options.value === selectedCity)}
          onChange={handleCityChange}
          options={options}
          placeholder="City"
          styles={colourStyles}
          defaultValue={null}
          isMulti={false}
          isSearchable={true}
          noOptionsMessage={customNoOptionsMessage}
          isClearable
          closeMenuOnSelect={true}
        />
        <div className={`${style.input} ${customStyle?.input}`}>
          <input type="search" placeholder="Search..." name="text" value={searchTerm} onChange={handleInputChange} autoFocus={true} onKeyDown={onKeyDown} />
          <IconButton className={`${style.searchIcon} ${customStyle?.searchIcon}`}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;