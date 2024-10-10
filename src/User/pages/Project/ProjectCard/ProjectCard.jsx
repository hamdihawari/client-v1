import { useDispatch, useSelector } from "react-redux";
import { fetchProjectCards, fetchProjectCardTranslations } from "../slices/projectCardSlice.js";
import { useTranslation } from "react-i18next";
import style from './style.module.css';
import { Link } from "react-router-dom";
import { ScrollToTopButton } from "../../../components/ScrollToTopButton/ScrollToTopButton.jsx";
import { MenuToggle } from "../../../components/MenuToggle/MenuToggle.jsx";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton } from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import rtlStyle from './rtl.module.css';
import { useEffect, useState } from "react";

const ProjectCard = () => {
    const dispatch = useDispatch();
    const { cards, translations, loading, error } = useSelector((state) => state.projectCards);
    const { t, i18n } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const isArabic = i18n.language === 'ar';

    useEffect(() => {
        dispatch(fetchProjectCards());
    }, [dispatch]);

    useEffect(() => {
        if (cards.length > 0) {
            const languageCode = i18n.language;
            cards.forEach(card => {
                dispatch(fetchProjectCardTranslations({ projectId: card.id, languageCode }));
            });
        }
    }, [cards.length, dispatch, i18n.language]);

    // Debugging logs
    console.log("Cards:", cards);
    console.log("Translations:", translations);
    console.log("Loading:", loading);
    console.log("Error:", error);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseEnter = () => {
        if (!('ontouchstart' in window)) {
            setIsHovered(true);
        }
    };

    return (
        <div>
            {cards.map(card => {
                // Accessing translation directly
                const translation = translations[card.id]?.[i18n.language] || null;

                return (
                    <div key={card.id} className={style.projectCard}
                         onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                    >
                        <Link to={card.id ? `/project/${card.id}` : '#'} className={style.project}>
                            <div className={style.imageContainer}>
                                <img
                                    src={isHovered ? card.imageHover : card.image}
                                    alt={card.title}
                                    className={style.cardImage}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'path/to/fallback-image.jpg'; // Update this path as necessary
                                    }}
                                />
                            </div>
                        </Link>
                        <div className={style.cardInfo}>
                            <h3 className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
                                {translation ? translation.subject : `Subject not available for ID ${card.id}`}
                            </h3>

                            <p className={`${style.data} ${isArabic ? rtlStyle.data : ''}`}>
                                {translation ? translation.data : `Data not available for ID ${card.id}`}
                            </p>

                            <p className={`${style.description} ${isArabic ? rtlStyle.description : ''}`}>
                                {translation ? translation.description : `Description not available for ID ${card.id}`}
                            </p>

                            <hr style={{
                                border: '0.2px solid #7d7d7d',
                                margin: '10px 0',
                                width: '75%',
                                marginTop: '27px',
                            }}/>

                            <div className={`${style.footer} ${isArabic ? rtlStyle.rtlFooter : ''}`}>
                                <IconButton className={`${style.icon} ${isArabic ? rtlStyle.favorit : ''}`}
                                            aria-label="favorite">
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
            })}
        </div>
    );
};

export default ProjectCard;