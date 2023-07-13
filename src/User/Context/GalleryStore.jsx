
import { GalleryContext } from "./Context";
import { useState, useEffect } from "react";
import axios from 'axios'
import React from 'react'

export const GalleryStore = ({children}) => {
  const [streetGallery, setStreetGallery]= useState([])
  const [landscapeGallery, setLandscapetGallery]= useState([])
  const [portraitGallery, setPortraitGallery]= useState([])
  const [project, setProject]= useState([])

  const landscapeImageUrl = "http://localhost:9000/landscapeImage"
  const streetImageUrl = "http://localhost:9000/streetImage"
  const projectUrl = "http://localhost:9000/projectCard"
  const portraitImageUrl = "http://localhost:9000/portraitImage"


  useEffect(() => {
    axios.get(landscapeImageUrl).then((res) => {
        setLandscapetGallery(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get(streetImageUrl).then((res) => {
        setStreetGallery(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get(projectUrl).then((res) => {
        setProject(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get(portraitImageUrl).then((res) => {
      setPortraitGallery(res.data)
    })
  }, [])
    return (
    <GalleryContext.Provider value={{
        streetGallery, landscapeGallery, project, portraitGallery
    }}>
        {
            children 
        }
    </GalleryContext.Provider>
  )
}


