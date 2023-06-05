import style from './style.module.css'
import personal from '../../../assets/images/personal.png'
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
                                    <h3>{val.title}</h3>
                                    <p>{val.description}</p>
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
