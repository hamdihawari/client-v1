// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useMemo } from 'react';
import { ProjectContext } from '../../../Context/ProjectProvidor.jsx'; // Ensure the correct path
import { Paginate } from '../../../components/Paginate/Paginate';
import ProjectItem from '../ProjectItem/ProjectItem';
import style from './style.module.css';

const Project = () => {
  const { projects } = useContext(ProjectContext); // Access 'projects' from context
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const totalItems = projects.length;
  const pageCount = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems]);

  const startIndex = currentPage * itemsPerPage;
  const projectsToShow = useMemo(() => projects.slice(startIndex, startIndex + itemsPerPage), [startIndex, projects]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (totalItems === 0) return <div>No projects available.</div>; // Early return if no projects

  return (
      <div className={style.project}>
        {projectsToShow.map((project) => (
            <ProjectItem
                key={project.id}
                id={project.id}
                path={""}
                title={project.title}
                icon={project.icon}
                data={project.data}
                image={project.image}
                imageHover={project.imageHover}
                subject={project.subject}
                description={project.description}
            />
        ))}
        <Paginate pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
  );
};

export default Project;

/*
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useMemo } from 'react';
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
                cardDescription={val.cardDescription || "No card description available"}
                subjectDetails={val.subjectDetails}
                descriptionData={val.descriptionData}
            />
        ))}
        <Paginate pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
  );
};

export default Project;
*/