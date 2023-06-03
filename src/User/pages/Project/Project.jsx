import React from 'react'
import style from './style.module.css'
import Card from '../../components/Cards/Card'

const Project = (/* props */) => {
  /* const { id, image, title, description } = props.projectsData; */
  return (
    <>
      <div className={style.project}>
        <div>
         <Card />
        </div>
      </div>
    </>
  )
}
export default Project




          {/* <div key={id} className={style.cardProjectContent}>
            <img src={image} alt='photoCards' width="1200px" id={style.img} />
            <div className={style.cardProjectBody}>
              <h2 className={title}>{value.title}</h2>
              <p className={style.cardText}>{description}</p>
            </div>
          </div> */}