import style from './style.module.css'
import { AboutData } from './AboutData'

const About = () => {
    return (
        AboutData.map((val) => {
            return (
                <div key={val.id} className={style.aboutContainer}>
                    <img className={style.personal} src={val.photo} alt="personalPic" id={style.personal} />
                    <div className={style.containerText}>
                        <h3 className={style.title}>{val.title}</h3>
                        <p className={style.description}>{val.description}</p>
                    </div>
                </div>
            )
        })
    )
}

export default About

/* import style from './style.module.css'
import { AboutData } from './AboutData'

const About = () => {
    return (
        <>
            <div className={style.about}>
                {
                    AboutData.map(val => {
                        return (
                            <>
                                <div key={val.id} className={style.aboutContainer}>
                                    <img className={style.personal} src={val.photo} alt="personalPic" id={style.personal} />
                                    <div className={style.containerText}>
                                        <h3 className={style.title}>{val.title}</h3>
                                        <p className={style.description}>{val.description}</p>
                                    </div>
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
 */