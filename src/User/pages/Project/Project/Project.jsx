import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ProjectContext } from '../../../Context/Context';
import { Paginate } from '../../../components/Paginate/Paginate';
import ProjectItem from '../ProjectItem/ProjectItem';
import style from './style.module.css';

const Project = () => {
  const { project } = useContext(ProjectContext);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const totalItems = project.length;
  const pageCount = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems]);

  const startIndex = currentPage * itemsPerPage;
  const projectsToShow = useMemo(() => project.slice(startIndex, startIndex + itemsPerPage), [startIndex, project]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (project.length === 0) return <div>No projects available.</div>;

  return (
      <div className={style.project}>
        {projectsToShow.map((val) => (
            <ProjectItem
                key={val.id}
                id={val.id}
                title={val.title}
                image={val.image}
                imageHover={val.imageHover}
                subject={val.subject}
                description={val.description}
                cardDescription={val.cardDescription}
                subjectDetails={val.subjectDetails}
                descriptionData={val.descriptionData}
            />
        ))}
        <Paginate pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
  );
};

export default Project;


/*
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ProjectContext } from '../../../Context/Context';
import { Paginate } from '../../../components/Paginate/Paginate';
import ProjectItem from '../ProjectItem/ProjectItem';
import style from './style.module.css';

// Safely formats description by splitting it into lines
function formatDescription(description) {
  return typeof description === 'string' ? description.split('\n') : [];
}

const Project = () => {
  const { project } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (project?.length > 0) {
      setIsLoading(false);
    }
  }, [project]);

  const itemsPerPage = 4;
  const totalItems = project.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const projectsToShow = useMemo(() => project.slice(startIndex, endIndex), [startIndex, endIndex, project]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project || project.length === 0) {
    return <div>No projects available.</div>;
  }

  return (
      <div className={style.project}>
        {projectsToShow.map((val) => (
            <ProjectItem
                // projectItem
                key={val.id}
                id={val.id}
                title={val.title}
                image={val.image}
                imageHover={val.imageHover}
                subject={val.subject}

                // projectDetail
                description={formatDescription(val.description)}
                cardDescription={formatDescription(val.cardDescription)}
                subjectDetails={formatDescription(val.subjectDetails)}
                descriptionData={formatDescription(val.descriptionData)}
            />
        ))}
        <Paginate pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
  );
};

export default Project;
*/
