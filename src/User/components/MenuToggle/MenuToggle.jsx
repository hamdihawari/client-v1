// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { Link } from 'react-router-dom';
import style from './style.module.css';

export const MenuToggle = (customStyle) => {
  const [isMenuOpen, setISMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setISMenuOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setISMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const item = [
    {
      id: 1,
      label: "Share",
      icon: <ShareIcon />,
      link: "/"
    },
    {
      id: 2,
      label: "Report this message",
      icon: <FlagIcon />,
      link: "/contact"
    }
  ];

  return (
      <div className={`${style.menuToggle} ${customStyle?.menuToggle}`} ref={menuRef}>
        <IconButton className={style.icon} id={style.moreHorizIcon} onClick={toggleMenu}>
          <MoreHorizIcon style={{ color: '#000000', fontSize: '26px' }} />
        </IconButton>
        {isMenuOpen && (
            <div className={`${style.controller}`}>
              {item.map((val) => (
                  <nav className={`${style.menuNav}`} key={val.id}>
                    <span className={style.icon}>{val.icon}</span>
                    <Link to={val.link} className={`${style.menuList}`}>
                      {val.label}
                    </Link>
                  </nav>
              ))}
            </div>
        )}
      </div>
  );
};


/*
import style from './style.module.css'
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { Link } from 'react-router-dom';

export const MenuToggle = (customStyle) => {
  const [isMenuOpen, setISMenuOpen] = useState(false)

  const toggleMenu = () => {
    setISMenuOpen(!isMenuOpen)
  }
  const item = [
    {
      id: 1,
      label: "Message",
      icon: <ShareIcon />,
      link: "/"
    },
    {
      id: 2,
      label: "Report this message",
      icon: <FlagIcon />,
      link: "/contact"
    }
  ]
  return (
    <div className={`${style.menuToggle} ${customStyle?.menuToggle}`}>
      <IconButton className={style.icon} id={style.moreHorizIcon} onClick={toggleMenu}>
        <MoreHorizIcon style={{ color: '#000000', fontSize: '26px' }} />
      </IconButton>
      <div className={style.controll}>
      {isMenuOpen && item.map((val) => {
        return (
          <nav className={style.menuNav} key={val.id}>
              <span className={style.icon}>{val.icon}</span>
              <Link to={val.link} className={style.menuList}>
                {val.label}
              </Link>
          </nav>
        )
      })}
      </div>
    </div>
  )
}
*/
