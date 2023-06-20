import style from './style.module.css'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

export const ProjectItem = ({ path, title, image, description }) => {
  return (
    <>
      <div className={style.projectContent}>
        <Link to={path} className={style.imgLink}>
          <img src={image} alt='photoscards' width="100%" id={style.img} />
        </Link>
        <div className={style.cardBody}>
          <h2 className={style.cardTitle}>{title}</h2>
          <p className={style.cardText}>{description}</p>
          <nav className={style.cardFooter}>
            <Link to={path} className={style.icon} id={style.favoriteIcon}><FavoriteIcon /></Link>
            <Link to={path} className={style.icon} id={style.SendIcon}><SendIcon /></Link>
            <Link to={path} className={style.icon} id={style.moreHorizIcon}><MoreHorizIcon /></Link>
          </nav>
        </div>
      </div>
    </>
  )
}
export default ProjectItem
