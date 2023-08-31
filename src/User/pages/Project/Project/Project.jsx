import style from './style.module.css'
import ProjectItem from '../ProjectItem/ProjectItem'
import { useContext, useState } from 'react'
import { ProjectContext } from '../../../Context/Context'
import { Paginate } from '../../../components/Paginate/Paginate'

const Project = () => {
  const { project } = useContext(ProjectContext);

  // Pagination setup
  const itemsPerPage = 4 // Adjust this based on your requirements
  const totalItems = project.length // Total number of items you're paginating
  const pageCount = Math.ceil(totalItems / itemsPerPage) /* calculates the total number of pages needed for pagination based on the total number of items and the number of items to display per page. */
  const [currentPage, setCurrentPage] = useState(0)
  // Calculate the start and end indexes of items for the current page
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  // Get the projects for the current page
  const projectsToShow = project.slice(startIndex, endIndex) /* used to create a subset of the original list of projects that should be displayed on the current page of your pagination. */

  return (
    <>
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
    </>
  );
};

export default Project;