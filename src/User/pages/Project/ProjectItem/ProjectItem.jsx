import style from './style.module.css';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';

export const ProjectItem = ({ path, title, image, description, imageHover }) => {
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

        <Link to={path} className={style.imgLink}>
          <img
            src={image}
            alt="photoscards"
            width="100%"
            id={style.img}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>

        <Link to={path}>
        <img
          alt="Hover Image"
          id={style.imgAfterHover}
          className={`${style.hoverImage} ${isHovered ? style.active : ''}`}
          src={imageHover}
        />
         </Link> 

      </div>
      <div className={style.cardBody}>
        <h2 className={style.cardTitle}>{title}</h2>
        <p className={style.cardText}>{description}</p>
        <nav className={style.cardFooter}>
          <Link to={path} className={style.icon} id={style.favoriteIcon}>
            <FavoriteIcon />
          </Link>
          <Link to={path} className={style.icon} id={style.SendIcon}>
            <SendIcon />
          </Link>
          <Link to={path} className={style.icon} id={style.moreHorizIcon}>
            <MoreHorizIcon />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default ProjectItem;

          {/* <div class={style.middle}>
            <div className={style.text}>{title}</div>
          </div> */}
/* {isHovered && (
  <div className={style.buttonContainer}>
    <Link to={path} className={style.icon} id={style.favoriteIcon}>
      <FavoriteIcon />
    </Link>
    <Link to={path} className={style.icon} id={style.SendIcon}>
      <SendIcon />
    </Link>
    <Link to={path} className={style.icon} id={style.moreHorizIcon}>
      <MoreHorizIcon />
    </Link>
  </div>
)} */