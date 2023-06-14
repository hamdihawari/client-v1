import React from 'react'
import style from './style.module.css'
import {Menu} from '../Menu/Menu'
export const Header = () => {
  return (
    <div className={style.header}>
      <Menu />
    </div>
  )
}
