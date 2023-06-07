import style from './style.module.css'
import { Link } from 'react-router-dom';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import React, { memo } from 'react';

/* export const Footer = React.memo(() => { */
export const Footer = () => {
  return (
    <>
      <footer>
        <div className={style.footerContainer}>

          <div className={style.socialIcons}>
            <Link to="https://www.facebook.com" id={style.iconLink}><FacebookOutlinedIcon id={style.icons} /></Link>
            <Link to="https://www.facebook.com" id={style.iconLink}><TwitterIcon id={style.icons} /></Link>
            <Link to="https://www.facebook.com" id={style.iconLink}><InstagramIcon id={style.icons} /></Link>
            <Link to="https://www.facebook.com" id={style.iconLink}><LinkedInIcon id={style.icons} /></Link>
            <Link to="https://www.facebook.com" id={style.iconLink}><WhatsAppIcon id={style.icons} /></Link>
          </div>

          <div className={style.footerNav}>
            <ul>
              <Link to="/about" className={style.navLink}>News</Link>
              <Link to="/about" className={style.navLink}>About</Link>
              <Link to="/project" className={style.navLink}>Project</Link>
              <Link to="/portrait" className={style.navLink}>Photography</Link>
              <Link to="/contact" className={style.navLink}>Contact</Link>
            </ul>
          </div>
        </div>

        <div className={style.footerbottom}>
          <p>Copyright &copy;2023; Designed by  <span id={style.designer}>www.hamdihawari.com</span></p>
        </div>
        
      </footer>
    </>
  )
}

export default memo(Footer)