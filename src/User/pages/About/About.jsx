import style from './style.module.css'
import { AboutData } from './AboutData'
import useMediaQuery from '../../Hooks/useMediaQuery'

const About = () => {
    const isLargeMobile = useMediaQuery('(min-width:400px)'); 
    return (
        AboutData.map((val) => {
            return (
                <div key={val.id} className={style.aboutContainer}>
                    <img id={style.personal} src={val.photo} alt="personalPic"/>
                    <div className={style.containerText}>
                        <h3 className={style.title}>{val.title} &#128512; </h3>
                        <p className={style.description}>{val.description}</p>
                    </div>
                </div>
            )
        })
    )
}
export default About