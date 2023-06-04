import style from './style.module.css'
import axios from 'axios'
import ProjectItem from '../../components/ProjectItem/ProjectItem'
import { useEffect, useState, } from 'react'
import React, { memo } from 'react';

const Project = () => {
  const url = "http://localhost:9000/projectCard"
  const [projectCardData, setProjectCardData] = useState([])
  useEffect(() => {
    axios.get(url).then((res) => {
      setProjectCardData(res.data)
      console.log(res.data)
    })
  }, [])
  return (
    <>
     <div className={style.card}>
        {projectCardData.map((val) => {
          return (<ProjectItem
            key={val.id}
            path={val.path}
            title={val.title}
            icon={val.icon}
            image={val.image}
            description={val.description}
          />
          )
        })}
      </div>
    </>
  )
}
export default memo(Project)




{/* <div key={id} className={style.cardProjectContent}>
            <img src={image} alt='photoCards' width="1200px" id={style.img} />
            <div className={style.cardProjectBody}>
              <h2 className={title}>{value.title}</h2>
              <p className={style.cardText}>{description}</p>
            </div>
          </div> */}