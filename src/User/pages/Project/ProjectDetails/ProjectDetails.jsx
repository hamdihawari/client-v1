import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GalleryContext } from '../../../Context/Context';
import style from './style.module.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const { project } = useContext(GalleryContext);
  const filteredProjects = project.filter(p => p.id === Number(id));

  return (
    <div className={style.projectDetails}>
      {filteredProjects.map((val) => (
        <div key={val.id} className={style.projectDetailsContener}>
          <div className={style.header}>
          <img src={val.image} alt={val.title} class={style.avatar} />
          <div>
          <h2 className={style.headerTitle}>{val.title}</h2>
          <p className={style.data}>{val.data}</p>
          </div>
          </div>
          {/* <Link to={`/project/${id}`} className={style.imgLink}> */}{/* </Link> */}
            <img src={val.image} alt={val.title} width="100%" className={style.img} />
          {val.projectDetails?.map((item) => (
            <div key={item.id}>
              <p className={style.cardDescription}>{item.cardDescription}</p>
              {Object.values(item.imageGroup).map((image, index) => (
                <img key={index} src={image} alt={item.alt} width="100%" className={style.img} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;
