import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../../Context/Context';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const { project, isArabic } = useContext(ProjectContext);

  // Filter project based on the ID from URL params
  const filteredProjects = project.filter(p => p.id === Number(id));

  // Handle case where no project is found
  if (filteredProjects.length === 0) {
    return <div>No project found.</div>;
  }

  return (
      <div className={`${style.projectDetailsWrapper} ${isArabic ? rtlStyle.projectDetailsWrapper : ''}`}>
        {filteredProjects.map((val) => (
            <div key={val.id} className={`${style.projectContainer} ${isArabic ? rtlStyle.projectContainer : ''}`}>
              <div className={`${style.projectHeader}`}>
                <img src={val.image} alt={val.title} className={style.projectThumbnail} />
                <div>
                  <h2 className={`${style.projectTitle} ${isArabic ? rtlStyle.projectTitle : ''}`}>{val.title}</h2>
                  <p className={`${style.projectDate} ${isArabic ? rtlStyle.projectDate : ''}`}>{val.data}</p>
                </div>
              </div>
              <img src={val.image} alt={val.title} width="100%" className={style.projectMainImage} />
              {val.projectDetails?.map((item) => (
                  <div key={item.id} className={`${style.projectDetailsSection} ${isArabic ? rtlStyle.projectDetailsSection : ''}`}>
                    <p className={`${style.projectSubject} ${isArabic ? rtlStyle.projectSubject : ''}`}>
                      {item.subjectDetails}
                    </p>
                    <p className={`${style.projectDataDescription} ${isArabic ? rtlStyle.projectDataDescription : ''}`}>
                      {val.data}
                    </p>
                    <p className={`${style.projectDescription} ${isArabic ? rtlStyle.projectDescription : ''}`}>
                      {item.cardDescription}
                    </p>
                    {/* Render all images with corresponding subjects */}
                    {Object.keys(item.imageGroup).map((imageKey, index) => (
                        <div key={index} className={style.projectImageGroupItem}>
                          <img src={item.imageGroup[imageKey].url} alt={`Image ${index + 1}`} width="100%" className={style.projectImage} />
                          {/* Display the corresponding subject for the image */}
                          <p className={style.projectImageSubject}>{item.imageGroup[imageKey].imageSubject}</p>
                        </div>
                    ))}
                  </div>
              ))}
            </div>
        ))}
      </div>
  );
};

export default ProjectDetails;
