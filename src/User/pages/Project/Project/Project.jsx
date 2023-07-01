import style from './style.module.css'
import ProjectItem from '../ProjectItem/ProjectItem'
import { useContext } from 'react'
import React, { memo } from 'react';
import { GalleryContext } from '../../../Context/Context';

const Project = () => {
  const {project} = useContext(GalleryContext)

  return (
    <>
    <div className={style.project}>
        {project.map((val) => {
          return (<ProjectItem
            key={val.id}
            path={val.path}
            title={val.title}
            icon={val.icon}
            image={val.image}
            imageHover={val.imageHover}
            description={val.description}
          />
          )
        })}
        </div>
    </>
  )
}
export default memo(Project)