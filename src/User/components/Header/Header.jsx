import React from 'react';
import style from './style.module.css';
import { Menu } from '../Menu/Menu';
import useMediaQuery from '../../Hooks/useMediaQuery';

export const Header = () => {
  const isLargeMobile = useMediaQuery('(max-width:992px)'); // Mobile 
  return (
    <>
      <div className={style.header}>
        {isLargeMobile && <h4 className={style.title}>Hamdi Hawari</h4>}
        {isLargeMobile && <Menu />}
      </div>
    </>
  );
};
