import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom'
import style from './style.module.css'
import axios from 'axios'
const Card = () => {
  const url = "http://localhost:9000/projectCard"
  const [projectCardData, setProjectCardData] = useState([])
  useEffect(() => {
    axios.get(url).then((res) => {
      setProjectCardData(res.data)
      console.log(res.data)
    })
  }, [])
  return (
    <>
      <div className={style.card}>
        {projectCardData.map((val) => {
          return (
            <>
              <div key={val.id} className={style.cardProjectContent}>
                <Link to="/about" className={style.imgLink}>
                  <img src={val.image} alt='photoscards' width="100%" id={style.img} />
                </Link>
                <div className={style.cardProjectBody}>
                  <h2 className={style.title}>{val.title}</h2>
                  <p className={style.cardText}>{val.description}</p>
                  <nav className={style.cardFooter}>
                    <Link to="/about" className={style.icon} id={style.favoriteIcon}><FavoriteIcon /></Link>
                    <Link to="/about" className={style.icon} id={style.SendIcon}><SendIcon /></Link>
                    <Link to="/about" className={style.icon} id={style.moreHorizIcon}><MoreHorizIcon /></Link>
                  </nav>
                </div>
              </div>
              <hr />
            </>
          )
        })}
      </div>
    </>
  )
}
export default Card
