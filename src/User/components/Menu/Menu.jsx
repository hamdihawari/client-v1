import React, { useState } from 'react'
import style from './style.module.css'
import { Link } from 'react-router-dom'
import { SidebarData } from '../Sidenav/SidebarData'
import { icons } from '../Sidenav/SidebarData'

export const Menu = () => {
    const [menuToggle, setMenuToggle] = useState(false)

    const [toggleItem, setToggleItem] = useState(false);

    const [changeColor, setChangeColor] = useState(false)

    const changeColorHandel = () => {
        setChangeColor(!changeColor)
    };

    const toggleMenuHandel = (index) => {
        index !== 1 ? setMenuToggle(!menuToggle) : setToggleItem(!toggleItem)

    }
    return (
        <>
            <div className={style.sidebarLayout}>
                <ul className={style.menu}>
                    <Link variant="text" className={style.menuBtn} style={{ color: changeColor ? "white" : "black" }}
                        onClick={() => { {toggleMenuHandel()} {changeColorHandel()} }}>Menu</Link>
                    <div className={style.controll}>
                        {
                            menuToggle && SidebarData.map((item, index) => {
                                return (
                                    <>
                                        <div key={item.id} className={style.row} >
                                            <nav className={style.menuList}>
                                                <span className={style.icons}>{item.icon}</span>
                                                <Link onClick={() => { toggleMenuHandel(index) }}
                                                    to={item.link} className={style.title}>{item.title}</Link>
                                            </nav>
                                        </div>
                                        {
                                            toggleItem && item.item?.map((val) => {
                                                return (
                                                    <>
                                                        <div key={val.id} className={style.row} >
                                                            <ul className={style.sidebarList}>
                                                                <nav className={style.menuList}>
                                                                    <span className={style.icons}></span>
                                                                    <Link onClick={toggleMenuHandel} to={val.link} className={style.title}>{val.title}</Link>
                                                                </nav>
                                                            </ul>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                        <div className={style.media}>
                            {
                                menuToggle && icons.map((val) => {
                                    return (
                                        <Link key={val.id} to={val.link} className={style.mediaList}>
                                            {val.icon}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>

                </ul>
            </div>
        </>
    )
}


/* import React, { useState } from 'react'
import style from './style.module.css'
import { Link } from 'react-router-dom'
import { SidebarData } from '../Sidenav/SidebarData'
import { icons } from '../Sidenav/SidebarData'
import { SidebarLayout } from '../Sidenav/SidebarLayout'
import styleSidebar from '../Sidenav/style.module.css'
import Sidebar from '../Sidenav/Sidebar'

export const Menu = () => {
    const [menuToggle, setMenuToggle] = useState(false)

    const [toggleItem, setToggleItem] = useState(false);

    const [changeColor, setChangeColor] = useState(false)

    const changeColorHandel = () => {
        setChangeColor(!changeColor)
    };

    const toggleMenuHandel = (index) => {
        index !== 1 ? setMenuToggle(!menuToggle) : setToggleItem(!toggleItem)
    }
    return (
        <>
            <div className={style.menuLayout}>
                <ul className={style.menu}>
                    <Link variant="text" className={style.menuBtn} style={{ color: changeColor ? "white" : "black" }}
                        onClick={() => { {toggleMenuHandel()} {changeColorHandel()} }}>Menu</Link>
                    <div className={style.controll}>
                    {
                        menuToggle  && <Sidebar className={style.sidebar}/> 
                    }
                    </div>

                </ul>
            </div>
        </>
    )
}
 */


/* */
