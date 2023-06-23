import React, { memo, useContext } from 'react'
import style from './style.module.css'
import { Link } from 'react-router-dom'
import { GalleryContext } from '../../../Context/Context'

const Street = () => {
    const { streetGallery } = useContext(GalleryContext)
    return (
        <>
            <div className={style.street}>
                <div className={style.streetContent}>
                    <div className={style.reactImagegallery}>
                        <h1>Street Gallery</h1>
                    </div>
                    {
                        streetGallery.map((item, index) => {
                            return (
                                <div key={item.id} className={style.gallery}>
                                    <div className={style.single}>
                                        <Link to={item.path}>
                                            <img src={item.original} alt='gallery' id={style.img} />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                </div>

            </div>
        </>
    )
}
export default memo(Street)
