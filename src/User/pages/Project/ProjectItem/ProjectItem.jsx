import style from './style.module.css';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';

export const ProjectItem = ({ id, title, image, description, imageHover, path }) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={style.projectContent}>
      <div className={style.imageContainer}>

        <Link to={`/project/${id}`} className={style.imgLink}>
          <img
            src={isHovered ? imageHover : image }
            alt="photoscards"
            width="100%"
            id={style.img}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>

      </div>
      <div className={style.cardBody}>
        <h2 className={style.cardTitle}>{title}</h2>
        <p className={style.cardText}>{description}</p>
        <nav className={style.cardFooter}>
          <Link className={style.icon} id={style.favoriteIcon}>
            <FavoriteIcon />
          </Link>
          <Link className={style.icon} id={style.SendIcon}>
            <SendIcon />
          </Link>
          <Link className={style.icon} id={style.moreHorizIcon}>
            <MoreHorizIcon />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default ProjectItem;