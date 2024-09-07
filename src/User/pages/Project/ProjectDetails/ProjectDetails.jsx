
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProjectContext } from '../../../Context/Context';
import style from './style.module.css';
import rtlStyle from './rtl.module.css'

const ProjectDetails = () => {
  const { id } = useParams();
  const { project } = useContext(ProjectContext);
  const filteredProjects = project.filter(p => p.id === Number(id));
  const { isArabic } = useContext(ProjectContext); 

  return (
    <div className={`${style.projectDetails} ${isArabic && rtlStyle.projectDetails}`}>
      {filteredProjects.map((val) => (
        <div key={val.id} className={`${style.projectDetailsContener} ${isArabic && rtlStyle.projectDetailsContener}`} >
          <div className={`${style.header} ${isArabic && rtlStyle.header}`}>
          <img src={val.image} alt={val.title} className={style.avatar} />
          <div className={`${style.headerContent} ${isArabic && rtlStyle.headerContent}`}>
          <h2 className={`${style.title} ${isArabic && rtlStyle.title}`}>{val.title}</h2>
          <p className={`${style.data} ${isArabic && rtlStyle.data}`}>{val.data}</p>
          </div>
          </div>
            <img src={val.image} alt={val.title} width="100%" className={style.img} />
          {val.projectDetails?.map((item) => (
            <div key={item.id}>
              <p className={`${style.cardDescription} ${isArabic && rtlStyle.cardDescription}`}>{item.cardDescription}</p>
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
