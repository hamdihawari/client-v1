import React from 'react'
import style from './style.module.css'
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <div className={style.logo}>
     <Link to="/about">
          <img src={logo} alt='myLogo' width="170" />
    </Link>
    </div>
  )
}
export default Logo
