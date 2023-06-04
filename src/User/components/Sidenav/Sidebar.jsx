import SidebarLayout from "./SidebarLayout";
import { Outlet } from 'react-router-dom'
import style from './style.module.css'
import { memo } from 'react';

function Sidebar() {
    return (
        <>
            <div className={style.sidebar}>
                <SidebarLayout />
                <main>
                    <Outlet />
                </main>
               
            </div>
        </>
    )
}

export default memo(Sidebar)