import React, { memo, useContext, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../../Context/Context';

const Street = () => {
    const { streetGallery } = useContext(GalleryContext)
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImage(streetGallery[index]);
      };
    return (
        <>
            <div className={style.street}>
                <div className={style.streetContent}>
                    <h1 className={style.header}>Street Gallery</h1>
                    {streetGallery.map((item, index) => (
                        <div key={item.id} className={style.gallery}>
                            <div className={style.single}>
                                <Link to={`/street/streetImage/${index}`} onClick={() => handleImageClick(index)}>
                                    <img src={item.original} alt='gallery' id={style.img} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedImage && (
                    <div className={style.selectedImage}>
                        <img src={selectedImage.original} alt='selected' />
                    </div>
                )}
            </div>
        </>
    )
}
export default memo(Street)
