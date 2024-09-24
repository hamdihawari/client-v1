// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo, createContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const ProjectContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectProvidor = ({ children }) => {  // Renamed from ProjectProvider to ProjectProvidor
    const [projects, setProjects] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language;
    const languageId = useMemo(() => {
        const languageMap = {
            en: 1,
            de: 2,
            ar: 3,
        };
        return languageMap[currentLanguage] || 1;
    }, [currentLanguage]);

    useEffect(() => {
        const fetchProjectData = async (languageId) => {
            try {
                setLoading(true);
                const projectCardsResponse = await axios.get(`http://localhost:8080/project_card?language_id=${languageId}`);
                const projectCards = projectCardsResponse.data;

                const fetchDetailsPromises = projectCards.map(async (project) => {
                    const [detailsResponse, imagesResponse] = await Promise.all([
                        axios.get(`http://localhost:8080/project_details/${project.id}`),
                        axios.get(`http://localhost:8080/image_group?project_details_id=${project.id}`) // Use correct endpoint
                    ]);

                    return {
                        ...project,
                        details: detailsResponse.data,
                        images: imagesResponse.data, // Ensure image data is mapped correctly
                    };
                });

                const completeProjectData = await Promise.all(fetchDetailsPromises);
                setProjects(completeProjectData);
                setError(null);
            } catch (err) {
                const message = err.response?.data?.message || err.message || 'Error fetching project data';
                setError(`Error fetching project data: ${message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData(languageId);
    }, [languageId]);

    const contextValue = useMemo(() => ({
        projects,
        setProjects,
        projectDetails,
        setProjectDetails,
        loading,
        error,
    }), [projects, projectDetails, loading, error]);

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};

/*
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo, createContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const ProjectContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language;
    const languageId = useMemo(() => {
        const languageMap = {
            en: 1,
            de: 2,
            ar: 3,
        };
        return languageMap[currentLanguage] || 1;
    }, [currentLanguage]);

    useEffect(() => {
        const fetchProjectData = async (languageId) => {
            try {
                setLoading(true);
                const projectCardsResponse = await axios.get(`http://localhost:8080/project_card?language_id=${languageId}`);
                const projectCards = projectCardsResponse.data;

                const fetchDetailsPromises = projectCards.map(async (project) => {
                    const [detailsResponse, imagesResponse] = await Promise.all([
                        axios.get(`http://localhost:8080/project_details/${project.id}`),
                        axios.get(`http://localhost:8080/image_group?project_details_id=${project.id}`) // Use correct endpoint
                    ]);

                    return {
                        ...project,
                        details: detailsResponse.data,
                        images: imagesResponse.data, // Ensure image data is mapped correctly
                    };
                });

                const completeProjectData = await Promise.all(fetchDetailsPromises);
                setProjects(completeProjectData);
                setError(null);
            } catch (err) {
                const message = err.response?.data?.message || err.message || 'Error fetching project data';
                setError(`Error fetching project data: ${message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData(languageId);
    }, [languageId]);

    const contextValue = useMemo(() => ({
        projects,
        setProjects,
        projectDetails,
        setProjectDetails,
        loading,
        error,
    }), [projects, projectDetails, loading, error]);

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};

*/
