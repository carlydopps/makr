// User can view the landing page with a summary of Makr if not logged in
// User can view the logged out nav bar
// User can click a button to start creating that will take them to the home page

import { ImageList } from "@mui/material"
import ReactPlayer from "react-player"
import { useNavigate } from "react-router-dom"
import { Footer } from "../footer/Footer"
import './LandingPage.css'

export const LandingPage = () => {

    const navigate = useNavigate()

    return <>
        <main className="main-landing">
            <div className="overlay"></div>
            <video src="https://res.cloudinary.com/dupram4w7/video/upload/v1663793714/pexels-polina-kovaleva-5644324_cf0fws.mp4" autoPlay loop muted/>
            <div className="content-landing">
                <h1 className="h1-landing">Welcome to Makr</h1>
                <p className="landing-summary">where the makers, the creators, and the DIYers can create more with personalized expert guidance</p>
                <p className="landing-summary_second">We provide expert guidance on demand so that pros are available to help when makrs need it most.</p>
                <button onClick={() => navigate("/home")} className="btn-create">Start creating</button>
            </div>
        </main>
        <footer className="footer-home">
            <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1663639606/Screen_Shot_2022-09-19_at_9.05.23_PM-removebg-preview_cvnxt3.png' alt="Home" className="footer-image"></img>
        </footer>
    </>
}
