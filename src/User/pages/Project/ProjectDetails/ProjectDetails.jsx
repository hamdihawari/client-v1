// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../../Context/ProjectProvidor.jsx';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import axios from 'axios';

const ProjectDetails = () => {
  const { id } = useParams(); // Get the project id from the URL
  const { projects, setProjectDetails, isArabic, loading, error } = useContext(ProjectContext);

  // Find the specific project by its ID
  const projectDetail = projects.find((project) => project.id === Number(id));

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch project details
        const detailsResponse = await axios.get(`http://localhost:8080/project_details/${id}`);
        // Fetch image group
        const imageGroupResponse = await axios.get(`http://localhost:8080/image_group?project_details_id=${id}`);

        // Set both details and images together
        setProjectDetails({
          ...detailsResponse.data,
          images: imageGroupResponse.data,  // Add images to the details data
        });
      } catch (err) {
        console.error('Failed to fetch project data:', err);
      }
    };

    // Only fetch data if the project doesn't have details or images yet
    if (!projectDetail?.details || !projectDetail?.images) {
      fetchProjectData();
    }
  }, [id, projectDetail?.details, projectDetail?.images, setProjectDetails]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!projectDetail) return <p>Project not found</p>;

  return (
      <div className={`${style.projectDetailsWrapper} ${isArabic ? rtlStyle.projectDetailsWrapper : ''}`}>
        <div className={`${style.projectContainer} ${isArabic ? rtlStyle.projectContainer : ''}`}>

          <div className={style.projectHeader}>
            <img src={projectDetail.image} alt={projectDetail.title} className={style.projectThumbnail} />
            <h1 className={`${style.projectTitle} ${isArabic ? rtlStyle.projectTitle : ''}`}>{projectDetail.title}</h1>
            <p className={`${style.projectData} ${isArabic ? rtlStyle.projectData : ''}`}>{projectDetail.data}</p>
          </div>

          <div className={`${style.projectInfo} ${isArabic ? rtlStyle.projectInfo : ''}`}>
            <img src={projectDetail.image} alt={projectDetail.title} width="100%" className={style.projectMainImage} />
            {projectDetail.details && (
                <>
                  <p className={`${style.subjectDetails} ${isArabic ? rtlStyle.subjectDetails : ''}`}>
                    {projectDetail.details.subjectDetails}
                  </p>
                  <p className={`${style.cardDescription} ${isArabic ? rtlStyle.cardDescription : ''}`}>
                    {projectDetail.details.cardDescription}
                  </p>
                </>
            )}
          </div>

          {/* Image group mapping */}
          {projectDetail.images && projectDetail.images.length > 0 && (
              <div className={style.projectImages}>
                <div className={style.imageGrid}>
                  {projectDetail.images.map((image, index) => (
                      <div key={index}> {/* Assign a unique key to the container div */}
                        <img
                            src={image.imgUrl}
                            alt={image.image_subject || `Project image ${index + 1}`}
                            className={style.projectDetailImage}
                        />
                        <p className={`${style.imageSubject} ${isArabic ? rtlStyle.imageSubject : ''}`}>
                          {image.imageSubject}
                        </p>
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default ProjectDetails;