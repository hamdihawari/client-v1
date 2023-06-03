import React from 'react'
import style from './style.module.css'
import logo from '../../../assets/images/footerLogo.png'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const Footer = () => {
  return (
    <>
      <footer >
        <div className={style.footerContainer}>
{/*         <img id={style.logofooter} src={logo} alt='logo' width="140px" /> */}
           <div className={style.socialIcons}>
              <a href=''><FacebookOutlinedIcon id={style.icons} /></a>
              <a href=''><TwitterIcon id={style.icons} /></a>
              <a href=''><InstagramIcon id={style.icons} /></a>
              <a href=''><LinkedInIcon id={style.icons} /></a>
              <a href=''><WhatsAppIcon id={style.icons} /></a>
            </div>
          
          <div className={style.footerNav}>
            <ul>
              <li> <a href="">News</a></li>
              <li> <a href="">About</a></li>
              <li> <a href="">Project</a></li>
              <li> <a href="">Photography</a></li>
              <li> <a href="">Contact</a></li>
            </ul>
          </div>

          </div>

          <div className={style.footerbottom}>
            <p>Copyright &copy;2023; Designed by  <span id={style.designer}>©Hamdi Hawari</span></p>
          </div>

      </footer>
    </>
  )
}


{/* <div className={style.logo}>
        <Link>
          <img src={logo} alt='logo' width="120px" />
          <span id={style.title}>Hamdi Hawari</span>
        </Link>

        <div  className={style.linkConent}>
          <ul>
            <Link to="./about" id={style.link}>About</Link>
            <Link to="./about" id={style.link}>Privacy Policy</Link>
            <Link to="./about" id={style.link}>Licensing</Link>
            <Link to="./about" id={style.link}>Contact</Link>
          </ul>
        </div>

      </div>
      <>
        <hr />
        <div id={style.copyright}>
          <span >© 2023 Hamdi Hawari™. All Rights Reserved.</span>
        </div>

      </> */}
