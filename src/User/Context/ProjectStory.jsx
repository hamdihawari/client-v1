

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ProjectContext } from './Context';
import { useTranslation } from 'react-i18next';

export const ProjectStory = ({ children }) => {
    const [project, setProject] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    // Map languages to language IDs
    const languageId = useMemo(() => {
        return {
            en: 1,
            de: 2,
            ar: 3,
        }[currentLanguage];
    }, [currentLanguage]);

    useEffect(() => {
        setLoading(true);  // Set loading to true when making a new request
        axios
            .get(`http://localhost:8080/project_card?language_id=${languageId}`)
            .then((res) => {
                setProject(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching project data');
                setLoading(false);
                console.error('Error fetching project data:', err);
            });
    }, [languageId]); // Only rerun the effect when the languageId changes

    const contextValue = useMemo(
        () => ({
            project,
            currentLanguage,
            isArabic: currentLanguage === 'ar',
        }),
        [project, currentLanguage]
    );

    // Error handling & Loading
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};



/*
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ProjectContext } from './Context';
import { useTranslation } from 'react-i18next';

export const ProjectStory = ({ children }) => {
    const [project, setProject] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    // Map languages to language IDs
    const languageId = useMemo(() => {
        return {
            en: 1,
            de: 2,
            ar: 3,
        }[currentLanguage];
    }, [currentLanguage]);

    useEffect(() => {
        setLoading(true);  // Set loading to true when making a new request
        axios
            .get(`http://localhost:8080/project_card?language_id=${languageId}`)
            .then((res) => {
                setProject(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching project data');
                setLoading(false);
                console.error('Error fetching project data:', err);
            });
    }, [languageId]); // Only rerun the effect when the languageId changes

    const contextValue = useMemo(
        () => ({
            project,
            currentLanguage,
            isArabic: currentLanguage === 'ar',
        }),
        [project, currentLanguage]
    );

    // Error handling & Loading
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};


 */