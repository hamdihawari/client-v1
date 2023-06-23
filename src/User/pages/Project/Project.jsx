import style from './style.module.css'
import axios from 'axios'
import ProjectItem from '../../components/ProjectItem/ProjectItem'
import { useContext, useEffect, useState, } from 'react'
import React, { memo } from 'react';
import { GalleryContext } from '../../Context/Context';

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
            description={val.description}
          />
          )
        })}
        </div>
    </>
  )
}
export default memo(Project)