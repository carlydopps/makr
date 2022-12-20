import { useNavigate } from "react-router-dom"
import './LandingPage.css'

export const LandingPage = () => {

    const navigate = useNavigate()

    return <>
        <main className="main-landing">
            <div className="overlay"></div>
            <video src="https://res.cloudinary.com/dupram4w7/video/upload/v1663793714/pexels-polina-kovaleva-5644324_cf0fws.mp4" autoPlay loop muted/>
            <div className="content-landing">
                <div className="landing-header">
                    <h1 className="h1-landing">Welcome
                        <div className="rotatingText">
                            <span>Makrs.</span>
                            <span>Creators.</span>
                            <span>DIYers.</span>
                            <span>Designers.</span>
                            <span>Builders.</span>
                        </div>
                    </h1>
                    
                </div>
                <p className="landing-summary">where the makers, the creators, and the DIYers can create more with personalized expert guidance</p>
                <button onClick={() => navigate("/home")} className="btn-create">Start creating</button>
            </div>
        </main>
        <footer className="footer-landing">
            <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1664854224/image_mmqlth.png' alt="Home" className="footer-image"></img>
        </footer>
    </>
}
