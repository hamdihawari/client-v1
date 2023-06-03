import SidebarLayout from "./SidebarLayout";
import { Outlet } from 'react-router-dom'
import style from './style.module.css'
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

export default Sidebar