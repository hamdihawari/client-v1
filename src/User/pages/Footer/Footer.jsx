import React from 'react'
import style from './style.module.css'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { memo } from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <div className={style.footer}>
        <div className={style.footerContainer}>
          <div className={style.socialIcons}>

            <Link id={style.iconLink}><FacebookOutlinedIcon id={style.icons} /></Link>
            <Link id={style.iconLink}><TwitterIcon id={style.icons} /></Link>
            <Link id={style.iconLink}><InstagramIcon id={style.icons} /></Link>
            <Link id={style.iconLink}><LinkedInIcon id={style.icons} /></Link>
            <Link id={style.iconLink}><WhatsAppIcon id={style.icons} /></Link>
          </div>

          <div className={style.footerNav}>
            <ul>
              <Link className={style.navLink}>News</Link>
              <Link className={style.navLink}>About</Link>
              <Link className={style.navLink}>Project</Link>
              <Link className={style.navLink}>Photography</Link>
              <Link className={style.navLink}>Contact</Link>
            </ul>
          </div>
        </div>

        <div className={style.footerbottom}>
          <p>Copyright &copy;2023; Designed by  <span id={style.designer}>www.hamdihawari.com</span></p>
        </div>
      </div>
    </>
  )
}
export default memo(Footer)