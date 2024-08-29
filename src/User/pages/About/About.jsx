/* wit JSon file */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import rtlStyle from './rtl.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const About = () => {
    const { i18n } = useTranslation()
    const [data, setData] = useState([])
    const currentLanguage = i18n.language
    /*const aboutDataUrl = "http://localhost:9000/aboutData"*/ //JSON Server
    const aboutDataUrl = "http://localhost:8080/about"; // Updated to your Spring Boot endpoint
    const isArabic = currentLanguage === 'ar'

    useEffect(() => {
        axios.get(aboutDataUrl)
            .then((res) => {
                console.log("Response data:", res.data); // Log the response
                const filteredData = res.data.filter(item => item.language === currentLanguage);
                if (Array.isArray(filteredData) && filteredData.length > 0) {
                    setData(filteredData);  // Set the filtered data to state
                } else {
                    console.error("No data available for the selected language");
                    setData([]);  // Set an empty array if no data is found for the language
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [currentLanguage]);



    /*return (
        <div className={style.about}>
            {data.map((item) => {
                return (
                    <div key={item.id} className={style.aboutContainer}>
                        <img src={item.photo} className={style.personal} alt="personal photo" />
                        <div className={`${style.containerText} ${isArabic && rtlStyle.containerText}`}>
                            <div className={`${style.titlecontent} ${isArabic ? rtlStyle.titlecontent : ""}`}>
                                <h3 className={`${style.title} ${isArabic ? rtlStyle.title : ""}`}>{item.title} &#128515;</h3>
                            </div>
                            <p className={style.description}>{item.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )*/
    return (
        <div className={style.about}>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                    <div key={item.id} className={style.aboutContainer}>
                        <img src={item.photo} className={style.personal} alt="personal photo" />
                        <div className={`${style.containerText} ${isArabic && rtlStyle.containerText}`}>
                            <div className={`${style.titlecontent} ${isArabic ? rtlStyle.titlecontent : ""}`}>
                                <h3 className={`${style.title} ${isArabic ? rtlStyle.title : ""}`}>{item.title} &#128515;</h3>
                            </div>
                            <p className={style.description}>{item.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default About