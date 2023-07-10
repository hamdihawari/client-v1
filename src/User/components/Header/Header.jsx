import React from 'react'
import style from './style.module.css'
import { Menu } from '../Menu/Menu'
import useMediaQuery from '../../Hooks/useMediaQuery'


export const Header = () => {
  const isLargeMobile = useMediaQuery('(max-width:992px)'); // Mobile 

  return (
    <div className={style.header}>
      {isLargeMobile && <Menu />}
      <h4>Hamdi Hawari</h4>
    </div>
  )
}
