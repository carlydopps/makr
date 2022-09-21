// User who is not logged in can click a sign up or login button in the nav bar that will route to the respective page

import { useNavigate } from "react-router-dom"
import "./LoggedOutNav.css"

export const LoggedOutNav = () => {

    const navigate = useNavigate()

    return (
        <section className="navbar-out">
            <button onClick={() => navigate(`/home`)} className="navbar__button navbar__home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1663639606/Screen_Shot_2022-09-19_at_9.05.23_PM-removebg-preview_cvnxt3.png' alt="Home" className="home-image"></img>
            </button>
            <section>
                <button onClick={() => navigate("/login")} className="navbar-button navbar__login">Login</button>
                <button onClick={() => navigate("/register")} className="navbar-button navbar__register">Register</button>
            </section>
        </section>
    )
}