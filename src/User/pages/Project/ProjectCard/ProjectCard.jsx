import { useDispatch, useSelector } from "react-redux";
import { fetchProjectCards, fetchProjectCardTranslations } from "../slices/projectCardSlice.js";
import { useTranslation } from "react-i18next"; // You can keep this if you are using i18n for language switching
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
    const { i18n } = useTranslation();  // Removed 't' since it's not being used
    const [isHovered, setIsHovered] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(
        window.innerWidth >= 992 && window.innerWidth <= 1199
    );
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

    // Check for medium screen size range (992px to 1199px)
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMediumScreen(width >= 992 && width <= 1199);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to truncate description text
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

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
                                    className={style.image}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'path/to/fallback-image.jpg'; // Update this path as necessary
                                    }}
                                />
                            </div>
                        </Link>
                        <div className={`${style.cardBody} ${isArabic ? rtlStyle.cardBody : ''}`}>
                            <h3 className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
                                {translation ? translation.subject : `Subject not available for ID ${card.id}`}
                            </h3>

                            <p className={`${style.data} ${isArabic ? rtlStyle.data : ''}`}>
                                {translation ? translation.data : `Data not available for ID ${card.id}`}
                            </p>

                            {/* Truncate description only for screens between 992px and 1199px */}
                            <p className={`${style.description} ${isArabic ? rtlStyle.description : ''}`}>
                                {translation ?
                                    isMediumScreen ? truncateText(translation.description, 165) : translation.description
                                    : `Description not available for ID ${card.id}`}
                            </p>

                            <hr style={{
                                border: '0.1px solid #7d7d7d',
                                margin: '10px 0',
                                width: '100%',
                                marginTop: '28px',
                            }}/>

                            <div className={`${style.footer} ${isArabic ? rtlStyle.rtlFooter : ''}`}>
                                <IconButton aria-label="favorite" className={style.footerButton}>
                                    <FavoriteBorderIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="dislike" className={style.footerButton}>
                                    <ThumbDownIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="share" className={style.footerButton}>
                                    <ShareIcon className={style.footerIcon}/>
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


// WORKING FINE:
/*
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
    const [isMediumScreen, setIsMediumScreen] = useState(
        window.innerWidth >= 992 && window.innerWidth <= 1199
    );
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

    // Check for medium screen size range (992px to 1199px)
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMediumScreen(width >= 992 && width <= 1199);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to truncate description text
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

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
                                    className={style.image}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'path/to/fallback-image.jpg'; // Update this path as necessary
                                    }}
                                />
                            </div>
                        </Link>
                        <div className={`${style.cardBody} ${isArabic ? rtlStyle.cardBody : ''}`}>
                            <h3 className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
                                {translation ? translation.subject : `Subject not available for ID ${card.id}`}
                            </h3>

                            <p className={`${style.data} ${isArabic ? rtlStyle.data : ''}`}>
                                {translation ? translation.data : `Data not available for ID ${card.id}`}
                            </p>

                            {/!* Truncate description only for screens between 992px and 1199px *!/}
                            <p className={`${style.description} ${isArabic ? rtlStyle.description : ''}`}>
                                {translation ?
                                    isMediumScreen ? truncateText(translation.description, 165) : translation.description
                                    : `Description not available for ID ${card.id}`}
                            </p>

                            <hr style={{
                                border: '0.1px solid #7d7d7d',
                                margin: '10px 0',
                                width: '100%',
                                marginTop: '28px',
                            }}/>

                            <div className={`${style.footer} ${isArabic ? rtlStyle.rtlFooter : ''}`}>
                                <IconButton aria-label="favorite" className={style.footerButton}>
                                    <FavoriteBorderIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="dislike" className={style.footerButton}>
                                    <ThumbDownIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="share" className={style.footerButton}>
                                    <ShareIcon className={style.footerIcon}/>
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
*/

/*
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
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 992);
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

    // Check screen size and adjust description length
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= 992);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to truncate description text
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

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
                                    className={style.image}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'path/to/fallback-image.jpg'; // Update this path as necessary
                                    }}
                                />
                            </div>
                        </Link>
                        <div className={`${style.cardBody} ${isArabic ? rtlStyle.cardBody : ''}`}>
                            <h3 className={`${style.subject} ${isArabic ? rtlStyle.subject : ''}`}>
                                {translation ? translation.subject : `Subject not available for ID ${card.id}`}
                            </h3>

                            <p className={`${style.data} ${isArabic ? rtlStyle.data : ''}`}>
                                {translation ? translation.data : `Data not available for ID ${card.id}`}
                            </p>

                            {/!* Truncate description text if the screen is smaller *!/}
                            <p className={`${style.description} ${isArabic ? rtlStyle.description : ''}`}>
                                {translation ?
                                    isSmallScreen ? truncateText(translation.description, 165) : translation.description
                                    : `Description not available for ID ${card.id}`}
                            </p>

                            <hr style={{
                                border: '0.1px solid #7d7d7d',
                                margin: '10px 0',
                                width: '100%',
                                marginTop: '28px',
                            }}/>

                            <div className={`${style.footer} ${isArabic ? rtlStyle.rtlFooter : ''}`}>
                                <IconButton aria-label="favorite" className={style.footerButton}>
                                    <FavoriteBorderIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="dislike" className={style.footerButton}>
                                    <ThumbDownIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="share" className={style.footerButton}>
                                    <ShareIcon className={style.footerIcon}/>
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
*/

/*
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
                                    className={style.image}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'path/to/fallback-image.jpg'; // Update this path as necessary
                                    }}
                                />
                            </div>
                        </Link>
                        <div className={`${style.cardBody} ${isArabic ? rtlStyle.cardBody : ''}`}>
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
                                border: '0.1px solid #7d7d7d',
                                margin: '10px 0',
                                width: '100%',
                                marginTop: '28px',
                            }}/>

                            <div className={`${style.footer} ${isArabic ? rtlStyle.rtlFooter : ''}`}>
                                <IconButton aria-label="favorite" className={style.footerButton}>
                                    <FavoriteBorderIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="dislike" className={style.footerButton}>
                                    <ThumbDownIcon className={style.footerIcon}/>
                                </IconButton>

                                <IconButton aria-label="share" className={style.footerButton}>
                                    <ShareIcon className={style.footerIcon}/>
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

export default ProjectCard;*/
