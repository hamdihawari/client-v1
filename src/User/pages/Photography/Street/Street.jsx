import React, { memo } from 'react'
import style from './style.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Street = () => {
    const streetImageUrl = "http://localhost:9000/streetImage"
    const [streetGallery, setStreetGallery] = useState([])
    useEffect(() => {
        axios.get(streetImageUrl).then((res) => {
            setStreetGallery(res.data)
        })
    }, [])
    return (
        <>
            <div className={style.street}>
                <div className={style.streetContent}>
                    <div className={style.reactImagegallery}>
                        <h1>Street Gallery</h1>
                    </div>
                   {/*  <Gallery item={landscapeImage}/> */}
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

/* import React, { memo } from 'react'
import style from './style.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Outlet } from 'react-router-dom';

const Street = () => {
    const streetImageUrl = "http://localhost:9000/streetImage"
    const [streetGallery, setStreetGallery] = useState([])
    useEffect(() => {
        axios.get(streetImageUrl).then((res) => {
            setStreetGallery(res.data)
        })
    }, [])
    return (
        <>
            <div className={style.street}>
                <div className={style.streetContent}>
                    <div className={style.reactImagegallery}>
                        <h1>Street Gallery</h1>
                    </div>
                    <Outlet />
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
export default memo(Street) */