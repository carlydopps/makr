// User who is not logged in can click a sign up or login button in the nav bar that will route to the respective page

import { useNavigate } from "react-router-dom"
import "./LoggedOutNav.css"

export const LoggedOutNav = () => {

    const navigate = useNavigate()

    return (
        <section className="navbar-out">
            <button onClick={() => navigate("/login")} className="navbar-button navbar__login">Login</button>
            <button onClick={() => navigate("/register")} className="navbar-button navbar__register">Register</button>
        </section>
    )
}