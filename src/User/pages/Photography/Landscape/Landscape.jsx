import React, { memo, useContext } from 'react'
import style from './style.module.css'
import { Link, Outlet } from 'react-router-dom';
import Gallery from '../../../components/Gallery/Gallery';
import { GalleryContext } from '../../../Context/Context';

const Landscape = () => {
  const { landscapeGallery } = useContext(GalleryContext)
  return (
    <>
      <div className={style.landscape}>
        <div className={style.landscapeContent}>
          <div className={style.reactImagegallery}>
            <h1>Street Gallery</h1>
          </div>
          {
            landscapeGallery.map((item, index) => {
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
export default memo(Landscape)