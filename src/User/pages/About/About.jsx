import style from './style.module.css'
import { AboutData } from './AboutData'

const About = () => {
    return (
        <>
            <div className={style.aboutContainer}>
                {
                    AboutData.map(val => {
                        return (
                            <>
                                <img className={style.personal} src={val.photo} alt="personalPic" id={style.personal} />
                                <div className={style.containerText}>
                                    <h3 className={style.title}>{val.title}</h3>
                                    <p className={style.description}>{val.description}</p>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default About
