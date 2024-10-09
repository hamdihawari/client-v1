import { useParams } from 'react-router-dom'; // Assumes you're using React Router
import { useContext, useEffect } from 'react';
import { ProjectContext } from '../../../Context/ProjectProvidor.jsx';
import { useTranslation } from 'react-i18next';
import style from "./style.module.css";

const ProjectDetails = () => {
    const { projects, loading, error } = useContext(ProjectContext);
    const { id } = useParams(); // Get the project ID from the URL
    const { i18n } = useTranslation(); // Get the i18n instance
    const currentLanguage = i18n.language; // Store the current language

    useEffect(() => {
        if (projects.length > 0) {
            console.log("Projects loaded:", projects);
        }
    }, [projects]);

    // Find the specific project based on the ID from the URL
    const project = projects.find((proj) => proj.id === parseInt(id, 10));

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>; // You can customize this message or add a spinner
    }

    // Handle error state
    if (error) {
        return <div>Error: {error}</div>; // Display the error message directly
    }

    // Handle case when the project is not found
    if (!project) {
        return <div>Project not found</div>; // Inform the user if the project doesn't exist
    }

    // Prepare translations for project details
    const details = project.details || {};  // Fallback to an empty object
    const subjectDetails = details.subjectDetails || 'No Subject Details Available';
    const cardDescription = details.cardDescription || 'No Card Description Available';
    console.log('Project Details:', project.details.cardDescription);
    console.log('Project Title:', project.title);
    console.log('Project details:', project.details);


    // Render project details
    return (
        <div className={`${style.projectDetailsWrapper}`}>
            <div className={style.projectContainer}>
                <div className={style.projectHeader}>
                    <img src={project.image} alt={project.title} className={style.thumbnail} />
                    <h1 className={style.title}>{project.title || 'No Title Available'}</h1>
                    <p>{project.data || 'No Data Available'}</p>
                </div>

                <div className={`${style.projectInfo}`}>
                    <img src={project.image} alt={project.title || 'Project Image'} className={style.image} />
                    {project.details && (
                        <>
                            <h2>{subjectDetails}</h2>
                            <p>{cardDescription}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;

