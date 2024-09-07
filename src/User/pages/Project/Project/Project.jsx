

// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect, useMemo } from 'react';
import style from './style.module.css';
import ProjectItem from '../ProjectItem/ProjectItem';
import { ProjectContext } from '../../../Context/Context';
import { Paginate } from '../../../components/Paginate/Paginate';

const Project = () => {
  const { project } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // This effect runs whenever `project` changes
  useEffect(() => {
    if (project.length) {
      setIsLoading(false);
    }
  }, [project]); // Dependency array

  // Ensure the number of hooks remains constant
  const itemsPerPage = 4;
  const totalItems = project.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const projectsToShow = useMemo(() => project.slice(startIndex, endIndex), [project, startIndex, endIndex]);

  // Render loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render empty state if no projects are available
  if (project.length === 0) {
    return <div>No projects available.</div>;
  }

  // Render the main content
  return (
      <div className={style.project}>
        {projectsToShow.map((val) => (
            <ProjectItem
                key={val.id}
                id={val.id}
                path={val.path}
                title={val.title}
                icon={val.icon}
                image={val.image}
                imageHover={val.imageHover}
                description={val.description}
            />
        ))}
        <Paginate pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
  );
};

export default Project;
