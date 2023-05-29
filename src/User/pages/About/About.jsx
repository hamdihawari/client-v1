import style from './style.module.css'
import personal from '../../../assets/images/personal.png'
import { Link } from 'react-router-dom'

const About = () =>{
    return (
        <>
            <div className={style.aboutContainer}>
                <img className={style.personal} src={personal} alt="personalPic" id={style.personal} />
                <div className={style.containerText}>
                    <h3>Hi, I’m Hamdi Hawari.</h3>
                    <p>I’m a mix of all things similar. adesigner, Programer, and photographer. I’m passionate about creating experiences that bring attention to the mystery, wonder, and beauty of the in-betweens.

                        As I photography of the peobley, I bring the story photos of Love to life through creative opinion, and help others visualize a world where the most advanced technology on the world.I’ve been carving my own path at the intersection of things ever since.With more challenge and obstacles I went through,

                        I started my journey in the world of technology in Germany - Berlin in  finished my studies in application programming . but also I had experience the Graphic Design & UX-UI in Damascus. I am still trying to add my mark somewhere. As an application designer and developer, I work hard to come up with some ideas that help people and program them in applications and websites and coexist with the current reality. see to a more I gave <strong><Link id={style.click} to="/about">Click</Link></strong>
                    </p>
                </div>
            </div>
        </>
    )
}

export default About