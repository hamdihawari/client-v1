import React from 'react'
import { ProjectContext } from "./Context";
import { useState, useEffect } from "react";
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const ProjectStory = ({ children }) => {
    const [project, setProject] = useState([])
    const projectUrl = "http://localhost:9000/projectCard"
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language
    const isArabic = currentLanguage === 'ar'

    // Include currentLanguage in the context value
    const contextValue = {
        project,
        currentLanguage,
        isArabic,
    };

    useEffect(() => {
        axios.get(projectUrl).then((res) => {
            setProject(res.data[currentLanguage])
        })
    }, [currentLanguage])

    return (
        <ProjectContext.Provider value={contextValue}>
            {
                children
            }
        </ProjectContext.Provider>
    )
}