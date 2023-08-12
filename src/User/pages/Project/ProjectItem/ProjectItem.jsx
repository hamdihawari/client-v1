import style from './style.module.css';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';


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
        <Link to={`/project/${id}`} className={style.imgLink}>
          <img
            src={isHovered ? imageHover : image }
            alt={title}
            width="100%"
            className={style.img}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
      <div className={style.cardBody}>
        <h2 className={style.cardTitle}>{title}</h2>
        <p className={style.cardText}>{description}</p>
        <div className={style.cardFooter}>
        <IconButton className={style.icon} id={style.favoriteIcon}>
          <FavoriteBorderIcon style={{ color: '#000000', fontSize: '26px' }} />
        </IconButton>
        <IconButton className={style.icon} id={style.SendIcon}>
          <ShareIcon style={{ color: '#000000', fontSize: '26px' }}/>
        </IconButton>
        <IconButton className={style.icon} id={style.moreHorizIcon}>
          <MoreHorizIcon style={{ color: '#000000', fontSize: '26px' }}/>
        </IconButton>
      </div>
      </div>
    </div>
  );
};

export default ProjectItem;