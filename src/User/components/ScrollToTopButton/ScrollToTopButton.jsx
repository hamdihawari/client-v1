import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${style.scrollToTop} ${isVisible ? style.visible : ''}`} onClick={scrollToTop}>
            {isVisible ? <span><ExpandCircleDownIcon style={{ color: '#000000', fontSize: '44px' }}/></span> : null}
        </div>
    )
}
