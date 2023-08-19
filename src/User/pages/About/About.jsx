/* wit JSon file */
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import rtlStyle from './rtl.module.css'
import useMediaQuery from '../../Hooks/useMediaQuery'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const About = () => {
    const isLargeMobile = useMediaQuery('(min-width: 400px)')
    const { i18n } = useTranslation()
    const [data, setData] = useState([])
    const currentLanguage = i18n.language
    const aboutDataUrl = "http://localhost:9000/aboutData"
    const isArabic = currentLanguage === 'ar'

    useEffect(() => {
        axios.get(aboutDataUrl)
            .then((res) => {
                setData(res.data[currentLanguage]);
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }, [currentLanguage]);

    return (
        <div className={style.about}>
            {console.log(data)}
            {data.map((item) => {
                return (
                    <div key={item.id} className={style.aboutContainer}>
                        <img src={item.photo} className={style.personal} alt="personal photo" />
                        <div className={`${style.containerText} ${isArabic ? rtlStyle.containerText : ''}`}>
                            <div className={style.titlecontent}>
                                <h3 className={style.title}>{item.title} &#128515;</h3>
                            </div>
                            <p className={style.description}>{item.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default About