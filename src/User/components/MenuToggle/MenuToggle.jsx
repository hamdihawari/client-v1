import style from './style.module.css'
import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, List } from '@mui/material';
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
