import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import { ProjectContext } from '../../../Context/Context';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';

export const ProjectItem = ({ id, title, image, subject, description, imageHover }) => {
    const { isArabic } = useContext(ProjectContext);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const cardStyle = isArabic ? rtlStyle.projectCard : style.projectCard;
    const bodyStyle = isArabic ? rtlStyle.cardBody : style.cardBody;
    const titleStyle = isArabic ? rtlStyle.title : style.title;
    const subjectStyle = isArabic ? rtlStyle.subject : style.subject;

    return (
        <div className={cardStyle}>
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
            <div className={bodyStyle}>
                <h2 className={titleStyle}>{title}</h2>
                <p className={subjectStyle}>
                    <Link to={`/project/${id}`} className={style.subjectLink}>
                        {subject}
                    </Link>
                </p>
                <p className={style.description}>{description}</p>
                <div className={style.footer}>
                    <IconButton>
                        <FavoriteBorderIcon style={{ color: '#000000', fontSize: '26px' }} />
                    </IconButton>
                    <IconButton>
                        <ThumbDownIcon style={{ color: '#000000', fontSize: '26px' }} />
                    </IconButton>
                    <IconButton>
                        <ShareIcon style={{ color: '#000000', fontSize: '26px' }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;

/*
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
