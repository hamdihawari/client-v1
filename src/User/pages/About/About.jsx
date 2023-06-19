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


// Dies Code in Material UI with Breackpoint Responsive:
/* import { AboutData } from './AboutData'
import Box from '@mui/material/Box';
import {Container} from '@mui/material';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import myStyle from './theme'

const About = () => {
    return (
        AboutData.map((val) => {
            return (
                <ThemeProvider theme={theme}>
                <Box key={val.id} sx={{
                    width: {xs: 400, sm: 550, md: 300, lg: 750, xl: 850},
                    margin: "0 auto",
                    marginTop: "4rem",
                    minHeight: "100vh"
                }}>
                    <Box textAlign={"center"} sx={{ 
                        display: {md: 'flex',
                        flexDirection: 'row'}
                        }} >
                    <img className={theme.image} src={val.photo} alt="personalPic" width="100%"
                    sx={{
                        width: {md: "50%"}
                    }}
                    />
                    <Typography variant="h5" className={myStyle}>{val.title}</Typography>
                    <Typography variant="body1">{val.description}</Typography>
                    </Box>
                </Box>
                </ThemeProvider>
            )
        })
    )
}
export default About */
