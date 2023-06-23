import React, { memo, useRef } from 'react'
import style from './style.module.css'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'
import { useParams } from 'react-router-dom';

const Gallery = () => {
    const {gallery} = useParams()
    const landscapeImageUrl = `http://localhost:9000/${gallery}`

    const [landscapeGallery, setlandscapeGallery] = useState([])

    useEffect(() => {
        axios.get(landscapeImageUrl).then((res) => {
            setlandscapeGallery(res.data)
        })
    }, [])

    const slideshowref = useRef()
    const playSlides = () => {
        slideshowref.current.play()
    }
    const stopPlaySlides = () => {
        slideshowref.current.pause()
    }
    console.log(`${gallery}`)
    return (
        <>       
         <div className={style.streetGallery}>
            <div className={style.reactImagegallery}>
                <h1>GALLERY</h1>
                <ImageGallery items={landscapeGallery}
                    ref={slideshowref}
                    showPlayButton={true}
                    showFullscreenButton={true}
                    slideInterval={3000}
                    slideOnThumbnailOver={true}
                    showThumbnails={true}
                    showIndex={true}
                    showNav={true}
                    isRTL={false}
                    showBullets={true}
                />
                <div className={style.slideControlBtn}>
                    <Button variant="contained" id={style.play} onClick={playSlides}>Play Slideshow</Button>
                    <Button variant="contained" color="error" id={style.pause} onClick={stopPlaySlides}>Stop Slideshow</Button>
                </div>
            </div>
        </div>

        {/* <div>
        <ImageGallery items={} />
        </div> */}
        </>
       
    )
}
export default memo(Gallery)



/* import React, { memo, useRef } from 'react'
import style from './style.module.css'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'

const Gallery = () => {
    const slideshowref = useRef()
    const playSlides = () => {
        slideshowref.current.play()
    }
    const stopPlaySlides = () => {
        slideshowref.current.pause()
    }
    const streetImageUrl = "http://localhost:9000/landscapeImage"
    const [streetGallery, setStreetGallery] = useState([])
    useEffect(() => {
        axios.get(streetImageUrl).then((res) => {
            setStreetGallery(res.data)
        })
    }, [])
    return (
        <div className={style.streetGallery}>
            <div className={style.reactImagegallery}>
                <ImageGallery items={streetGallery}
                    ref={slideshowref}
                    showPlayButton={true}
                    showFullscreenButton={true}
                    slideInterval={3000}
                    slideOnThumbnailOver={true}
                    showThumbnails={true}
                    showIndex={true}
                    showNav={true}
                    isRTL={false}
                    showBullets={true}
                />
                <div className={style.slideControlBtn}>
                    <Button variant="contained" id={style.play} onClick={playSlides}>Play Slideshow</Button>
                    <Button variant="contained" color="error" id={style.pause} onClick={stopPlaySlides}>Stop Slideshow</Button>
                </div>
            </div>
        </div>
    )
}
export default memo(Gallery) */