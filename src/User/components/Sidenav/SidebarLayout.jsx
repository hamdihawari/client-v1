import React, { useEffect, useState } from 'react';
import style from './style.module.css'
import rtlStyle from './rtl.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import { memo } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import CallIcon from '@mui/icons-material/Call'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Menu } from '../Menu/Menu';

export const SidebarLayout = () => {
  const { i18n } = useTranslation()
  const [sidebarData, setSidebar] = useState([])
  const [socialMediaIcons, setSocialMediaIcons] = useState([])
  const currentLanguage = i18n.language
  const SidebarDataUrl = "http://localhost:9000/SidebarData"
  const socialMediaIconsUrl = "http://localhost:9000/socialMediaicons"
  const isArabic = currentLanguage === 'ar'
  const [toggle, setToggle] = useState(false);

  const sidebarIconMap = {
    FingerprintIcon: <FingerprintIcon />,
    CameraAltIcon: <CameraAltIcon />,
    AccountCircleIcon: <AccountCircleIcon />,
    CallIcon: <CallIcon />,
  };
  const socialMediaIconsMap = {
    MailOutlineIcon: <MailOutlineIcon />,
    TwitterIcon: <TwitterIcon />,
    InstagramIcon: <InstagramIcon />
  };
  const toggleHandle = (index) => {
    index === 6001 && setToggle(!toggle)
  }

  useEffect(() => {
    axios.get(SidebarDataUrl)
      .then((res) => {
        setSidebar(res.data[currentLanguage]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [currentLanguage]);

  useEffect(() => {
    axios.get(socialMediaIconsUrl)
      .then((res) => {
        setSocialMediaIcons(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, []);
  
  return (
    <>
      <div className={style.sidebarLayout}>
        <Logo />
        {sidebarData.map((item, index) => {
            return (
              <ul className={`${style.sidebarList} ${isArabic && rtlStyle.rtlSidebarList}`} key={item.id}>
                <nav className={`${style.row} ${isArabic && rtlStyle.rtlRow}`}>
                  <span id={style.icon}>{sidebarIconMap[item.icon]}</span>
                  <Link onClick={() => { toggleHandle(item.id) }}
                    to={item.link} className={`${style.title} ${isArabic && rtlStyle.rtlTitle}`}>
                    {item.title}
                  </Link>
                </nav>
                {
                  toggle && item.item?.map((items) => {
                    return (
                      <ul className={`${style.sidebarList} ${isArabic && rtlStyle.rtlSidebarList}`} key={items.id}>
                        <nav key={items.id} className={`${style.row} ${isArabic && rtlStyle.rtlRow}`}
                          id={style.row}>
                          <span id={style.icon}></span>
                          <Link to={items.link} className={`${style.title} ${isArabic && rtlStyle.rtlTitle}`}>{items.title}</Link>
                        </nav>
                      </ul>
                    )
                  })
                }
              </ul>
            )
          }
          )}
        <div className={style.media} >
          {
            socialMediaIcons.map((val) =>
              <Link to={val.link} key={val.id} className={style.mediaList}>
                {socialMediaIconsMap[val.icon]}
              </Link>
            )
          }
        </div >
        <Menu sidebarData={sidebarData} />
       {/*  {console.log("HIIII :", sidebarData)} */}

      </div>
    </>
  )
}
export default memo(SidebarLayout)