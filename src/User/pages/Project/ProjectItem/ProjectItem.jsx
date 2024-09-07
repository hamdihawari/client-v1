

import style from './style.module.css'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import { IconButton } from '@mui/material'
import { MenuToggle } from '../../../components/MenuToggle/MenuToggle'
import { ScrollToTopButton } from '../../../components/ScrollToTopButton/ScrollToTopButton';
import { ProjectContext } from '../../../Context/Context'
import rtlStyle from './rtl.module.css'

// eslint-disable-next-line react/prop-types
export const ProjectItem = ({ id, title, image, description, imageHover}) => {

  const { isArabic } = useContext(ProjectContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
<>
    <div className={`${style.projectContent} ${isArabic && rtlStyle.cardBody}`}>
      <div className={style.imgLink}>
        <Link to={`/project/${id}`}>
          <img
            src={isHovered ? imageHover : image}
            alt={title}
            width="100%"
            className={style.img}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
      </div>

      <div className={`${style.cardBody} ${isArabic && rtlStyle.cardBody}`}>
        <h2 className={`${style.cardTitle} ${isArabic && rtlStyle.cardTitle}`}>{title}</h2>

        <p className={`${style.cardText} ${isArabic && rtlStyle.cardText}`}>{description}</p>
        <div className={`${style.cardFooter} ${isArabic && rtlStyle.cardFooter}`}>
          <IconButton className={style.icon} id={style.favoriteIcon}>
            <FavoriteBorderIcon style={{ color: '#000000', fontSize: '26px' }} />
          </IconButton>
          <IconButton className={style.icon} id={style.SendIcon}>
            <ShareIcon style={{ color: '#000000', fontSize: '26px' }} />
          </IconButton>
          <MenuToggle />
        </div>

      </div>
      <ScrollToTopButton />

    </div>

    </>
  );
};

export default ProjectItem;