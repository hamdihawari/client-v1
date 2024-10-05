import { useParams } from 'react-router-dom'; // Assumes you're using React Router
import { ProjectContext } from '../../../Context/ProjectProvidor.jsx';
import { useContext } from "react";
import style from "./style.module.css";

const ProjectDetails = () => {
    const { projects, loading, error } = useContext(ProjectContext);
    const { id } = useParams(); // Get the project ID from the URL

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

    // Render project details
    return (
        <div className={`${style.projectDetailsWrapper}`}>
            <div className={style.projectContainer}>
                <div className={style.projectHeader}>
                    <img src={project.image} alt={project.title} className={style.thumbnail}/>
                    <h1 className={style.title}>{project.title || 'No Title Available'}</h1>
                    <p>{project.data || 'No Data Available'}</p>
                </div>

                <div className={`${style.projectInfo}`}>
                    <img src={project.image} alt={project.title || 'Project Image'} className={style.image}/>
                    {project.details && (
                        <>
                            <h2>{project.details.subjectDetails || 'No Subject Details Available'}</h2>
                            <p>{project.details.cardDescription || 'No Card Description Available'}</p>
                        </>

                    )}
                    {/* Add any additional data you want to display from projectCard */}
                    {console.log("Data : " + project.data)}
                </div>
            </div>

        </div>
    );
};

export default ProjectDetails;
