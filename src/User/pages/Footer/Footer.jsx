import React from 'react'
import style from './style.module.css'
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className={style.footer}>
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
    </div>
  )
}



