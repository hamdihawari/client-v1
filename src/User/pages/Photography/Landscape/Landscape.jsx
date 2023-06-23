import React, { memo } from 'react'
import style from './style.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Landscape = () => {
  const landscapeImageUrl = "http://localhost:9000/landscapeImage"
  const [landscapeImage, setLandscapeGallery] = useState([])

  useEffect(() => {
    axios.get(landscapeImageUrl).then((res) => {
      setLandscapeGallery(res.data)
    })
  }, [])
  return (
    <>
      <div className={style.landscape}>
        <div className={style.landscapeContent}>
          <div className={style.reactImagegallery}>
            <h1>Street Gallery</h1>
          </div>
          {
            landscapeImage.map((item, index) => {
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



/* import React, { memo } from 'react'
import style from './style.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Outlet } from 'react-router-dom';
import Gallery from '../../../components/Gallery/Gallery';

const Landscape = () => {
    const landscapeImageUrl = "http://localhost:9000/landscapeImage"
    const [landscapeImage, setLandscapeGallery] = useState([])
    useEffect(() => {
        axios.get(landscapeImageUrl).then((res) => {
          setLandscapeGallery(res.data)
        })
    }, [])
    return (
        <>
            <div className={style.landscape}>
                <div className={style.landscapeContent}>
                    <div className={style.reactImagegallery}>
                        <h1>Street Gallery</h1>
                    </div>
                    <Outlet />
                    <Gallery />
                    {
                        landscapeImage.map((item, index) => {
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
export default memo(Landscape) */