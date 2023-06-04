import React from 'react';
import { SidebarData } from './SidebarData';
import style from './style.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { icons } from './SidebarData'
import Logo from '../../components/Logo/Logo'
import { memo } from 'react';

const SidebarLayout = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className={style.sidebarLayout}>
        <Logo />
        <ul className={style.sidebarList}>
          {
            SidebarData.map((item, index) => {
              const toggleHandle = (index) => {
                index === 1 && setToggle(!toggle)
                console.log(index)
              }
              return (
                <>
                  <nav className={style.row} key={item.id}>
                    <span id={style.icon}>{item.icon}</span>
                    <Link onClick={() => { toggleHandle(index) }}
                      id={style.title} to={item.link}>{item.title}
                    </Link>
                  </nav>
                  {
                    //toggle list
                    toggle && item.item?.map((items) => {
                      return (
                        <ul className={style.sidebarList}>
                          <nav key={items.id} className={style.row} id={style.row}>
                            <span id={style.icon}>{/* {items.icon} */}</span>
                            <Link to={items.link} id={style.title}>{items.title}</Link>
                          </nav>
                        </ul>
                      )
                    })
                  }
                </>
              )
            })
          }
        </ul>

        <div className={style.media}>
        {
          //Social Media
          icons.map((val) =>
              <Link to={val.link} key={val.id} className={style.mediaList}>
                {val.icon}
              </Link>
          )
        }
        </div>
      </div>
    </>
  );
};
export default memo(SidebarLayout)