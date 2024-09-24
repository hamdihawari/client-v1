// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../../Context/ProjectProvidor.jsx'; // Ensure correct import path
import { Link } from "react-router-dom";
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import {ScrollToTopButton} from "../../../components/ScrollToTopButton/ScrollToTopButton.jsx";
import {IconButton} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {MenuToggle} from "../../../components/MenuToggle/MenuToggle.jsx";
import ShareIcon from "@mui/icons-material/Share";

// eslint-disable-next-line react/prop-types
const ProjectItem = ({ id, title, image, imageHover, subject, description }) => {
  const { isArabic } = useContext(ProjectContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }


  return (
      <div className={`${style.projectCard} ${isArabic ? rtlStyle.projectCard : ''}`}>
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

        <div className={`${style.cardBody} ${isArabic ? rtlStyle.cardBody : ''}`}>
          <h2 className={`${style.title} ${isArabic ? rtlStyle.title : ''}`}>{title}</h2>
          <p className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
            <Link to={`/project/${id}`} className={`${style.subjectLink} ${isArabic ? rtlStyle.subjectLink : ''}`}>
              {subject}
            </Link>
          </p>
          <p className={`${style.description} ${isArabic ? rtlStyle.description : ''}`}>{description}</p>
          <hr style={{
            border: '0.2px solid #7d7d7d',
            margin: '10px 0',
            width: '75%',
            marginTop: '27px',
            marginLeft: '13px'
          }}/>

          <div className={`${style.footer} ${isArabic ? rtlStyle.footer : ''}`}>
            <IconButton className={`${style.icon} ${isArabic ? rtlStyle.favorit : ''}`}>
              <FavoriteBorderIcon style={{color: '#000000', fontSize: '26px'}}/>
            </IconButton>
            <IconButton className={style.icon}>
              <ThumbDownIcon style={{color: '#000000', fontSize: '26px'}}/>
            </IconButton>
            <IconButton className={style.icon}>
              <ShareIcon style={{color: '#000000', fontSize: '26px'}}/>
            </IconButton>
            <MenuToggle/>
          </div>
        </div>
        <ScrollToTopButton/>
      </div>
  );
};

export default ProjectItem;

/*
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton } from '@mui/material';
import { MenuToggle } from '../../../components/MenuToggle/MenuToggle';
import { ScrollToTopButton } from '../../../components/ScrollToTopButton/ScrollToTopButton';
import { ProjectContext } from '../../../Context/Context';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';

// eslint-disable-next-line react/prop-types
export const ProjectItem = ({ id, title, image, subject, description, imageHover }) => {
  const { isArabic } = useContext(ProjectContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
      <div className={`${style.projectCard} ${isArabic ? rtlStyle.projectCard : ''}`}>
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

        <div className={`${style.cardBody} ${isArabic ? rtlStyle.cardBody : ''}`}>
          <h2 className={`${style.title} ${isArabic ? rtlStyle.title : ''}`}>{title}</h2>
          <p className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
            <Link to={`/project/${id}`} className={`${style.subjectLink} ${isArabic ? rtlStyle.subjectLink : ''}`}>
              {subject}
            </Link>
          </p>
          <p className={`${style.description} ${isArabic ? rtlStyle.description : ''}`}>{description}</p>
          <hr style={{
            border: '0.2px solid #7d7d7d',  // Helles Grau für bessere Sichtbarkeit
            margin: '10px 0',
            width: '75%',
            marginTop: '27px',
            marginLeft: '13px'
          }}/>

          <div className={`${style.footer} ${isArabic ? rtlStyle.footer : ''}`}>
            <IconButton className={`${style.icon} ${isArabic ? rtlStyle.favorit : ''}`}>
              <FavoriteBorderIcon style={{color: '#000000', fontSize: '26px'}}/>
            </IconButton>
            <IconButton className={style.icon}>
              <ThumbDownIcon style={{color: '#000000', fontSize: '26px'}}/>
            </IconButton>
            <IconButton className={style.icon}>
              <ShareIcon style={{color: '#000000', fontSize: '26px'}}/>
            </IconButton>
            <MenuToggle/>
          </div>
        </div>
        <ScrollToTopButton/>
      </div>
  );
};

export default ProjectItem;

*/