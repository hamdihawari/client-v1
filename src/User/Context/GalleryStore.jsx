import { GalleryContext } from "./Context";
import { useState, useEffect } from "react";
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
export const GalleryStore = ({ children }) => {

  const [streetGallery, setStreetGallery] = useState([])
  const [landscapeGallery, setLandscapetGallery] = useState([])
  const [portraitGallery, setPortraitGallery] = useState([])

  const landscapeImageUrl = "http://localhost:9000/landscapeImage"
  const streetImageUrl = "http://localhost:9000/streetImage"
  const portraitImageUrl = "http://localhost:9000/portraitImage"

  const { i18n } = useTranslation()
  const currentLanguage = i18n.language
  const isArabic = currentLanguage === 'ar'

  // Include currentLanguage in the context value
  const contextValue = {
    streetGallery, 
    landscapeGallery, 
    portraitGallery,
    currentLanguage,
    isArabic,
  };

  useEffect(() => {
    axios.get(landscapeImageUrl).then((res) => {
      setLandscapetGallery(res.data[currentLanguage])
    })
  }, [currentLanguage])

  useEffect(() => {
    axios.get(streetImageUrl).then((res) => {
      setStreetGallery(res.data[currentLanguage])
    })
  }, [currentLanguage])

  useEffect(() => {
    axios.get(portraitImageUrl).then((res) => {
      setPortraitGallery(res.data[currentLanguage])
    })
  }, [currentLanguage])
  
  return (
    <GalleryContext.Provider value={contextValue}>
      {
        children
      }
    </GalleryContext.Provider>
  )
}