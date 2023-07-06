import { Link, useParams } from 'react-router-dom';
import style from './style.module.css'
import { useContext } from 'react';
import { GalleryContext } from '../../../Context/Context';

const ProjectDetails = () => {
  const { id } = useParams()
  const { project } = useContext(GalleryContext)
  const filteredProjects = project.filter(p => p.id === Number(id))
  /* console.log(filteredProjects) */
  return (
    <>
      <div className={style.projectDetails}>
        {
          filteredProjects.map((val) => {
            return (
              <div key={val.id} className={style.projectDetailsContener}>
                <h2 className={style.header}>{val.title}</h2>
                <p>{val.data}</p>
                <Link to={`/project/${id}`} className={style.imgLink}>
                  <img src={val.image} alt="photoscards" width="100%" id={style.img} />
                </Link>

                {
                  val.projectDetails?.map((item) => {
                    return (
                      <div key={item.id}>
                        <p>{item.cardDescription}</p>
                        {
                        Object.values(item.imageGroup).map((image, index) => (
                          <img key={index} src={image} alt="C|O" width="100%" id={style.img} />
                        ))
                        }
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </>

  )
}

export default ProjectDetails;

/* project.filter(project => project.id === Number(id)).map((val) => { */