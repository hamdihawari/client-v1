import SidebarLayout from './SidebarLayout'
import { Outlet } from 'react-router-dom'
import { memo } from 'react'
/* import useMediaQuery from '@mui/material/useMediaQuery' */
import useMediaQuery from '../../Hooks/useMediaQuery'

function Sidebar() {
/*     const isSmallThan768 = useMediaQuery('(min-width: 768px)') */
    const isSmallThan992 = useMediaQuery('(min-width: 992px)')
    const isLargeThan1200 = useMediaQuery('(min-width:1200px)')

    return (
        <div >
            {isSmallThan992  || isLargeThan1200 ? <SidebarLayout /> : "" }

            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default memo(Sidebar)