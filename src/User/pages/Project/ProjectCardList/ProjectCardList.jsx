// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { ProjectContext } from '../../../Context/ProjectProvidor';
import ProjectCard from '../ProjectCard/ProjectCard.jsx';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const ProjectCardList = () => {
    const { projects, loading, error } = useContext(ProjectContext);
    const { i18n } = useTranslation(); // Get the current language using i18n
    const currentLanguage = i18n.language; // Store the current language

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {projects.map((project) => (
                // Pass the language prop along with the project data
                <ProjectCard key={project.id} project={project} language={currentLanguage} />
            ))}
        </div>
    );
};

export default ProjectCardList;

