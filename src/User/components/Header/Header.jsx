import React from 'react'
import style from './style.module.css'
import { Menu } from '../Menu/Menu'
import useMediaQuery from '../../Hooks/useMediaQuery'


export const Header = () => {
  const isSmallMobile = useMediaQuery('(max-width:600px)'); // Small Mobile
  const isLargeMobile= useMediaQuery('(max-width:767px)'); // Mobile 

  return (
    <div className={style.header}>
      {isSmallMobile ? <Menu /> : isLargeMobile && <Menu />}
     {}
    </div>
  )
}
