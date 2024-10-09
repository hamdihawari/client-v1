import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import rtlStyle from './rtl.module.css';
import style from './style.module.css';
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { MenuToggle } from "../../../components/MenuToggle/MenuToggle.jsx";
import ShareIcon from "@mui/icons-material/Share";
import { ScrollToTopButton } from "../../../components/ScrollToTopButton/ScrollToTopButton.jsx";

const ProjectCard = ({ project, language }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isArabic = language === 'ar';

    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseEnter = () => {
        if (!('ontouchstart' in window)) {
            setIsHovered(true);
        }
    };

    return (
        <div
            className={style.projectCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link to={project.id ? `/project/${project.id}` : '#'} className={style.project}>
                <div className={style.imageContainer}>
                    <img
                        src={isHovered ? project.imageHover : project.image}
                        alt={project.title}
                        className={style.cardImage}
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'path/to/fallback-image.jpg';
                        }}
                    />
                </div>
            </Link>

            <div className={style.cardInfo}>
                <h3 className={`${style.title} ${isArabic ? rtlStyle.title : ''}`}>
                    {project.title || 'Default Title'}
                </h3>
                <p className={`${style.description} ${isArabic ? rtlStyle.description : ''}`}>
                    {project.description || 'Default Description'}
                </p>
                <hr style={{
                    border: '0.2px solid #7d7d7d',
                    margin: '10px 0',
                    width: '75%',
                    marginTop: '27px',
                }}/>

                <div className={`${style.footer} ${isArabic ? rtlStyle.rtlFooter : ''}`}>
                    <IconButton className={`${style.icon} ${isArabic ? rtlStyle.favorit : ''}`} aria-label="favorite">
                        <FavoriteBorderIcon style={{color: '#000000', fontSize: '26px'}}/>
                    </IconButton>
                    <IconButton className={style.icon} aria-label="dislike">
                        <ThumbDownIcon style={{color: '#000000', fontSize: '26px'}}/>
                    </IconButton>
                    <IconButton className={style.icon} aria-label="share">
                        <ShareIcon style={{color: '#000000', fontSize: '26px'}}/>
                    </IconButton>
                    <MenuToggle/>
                </div>

                <ScrollToTopButton/>
            </div>
        </div>
    );
};

// Define the expected shape of the project object for better type safety
ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        imageHover: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        detailsTranslations: PropTypes.object.isRequired, // Ensure detailsTranslations are passed
    }).isRequired,
    language: PropTypes.string.isRequired,
};

export default ProjectCard;
