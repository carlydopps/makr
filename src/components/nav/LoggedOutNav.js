import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./LoggedOutNav.css"

export const LoggedOutNav = () => {

    const [background, setBackground] = useState("")
    const [text, setText] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(
        () => {
            if (window.location.pathname === "/") {
                setBackground('transparent');
                setText('white')
            } else {
                setBackground('#FF9659')
                setText('white')
            }
        },
        [location]
    )

    return (
        <section className="navbar-out" style={{backgroundColor: background}}>
            <button onClick={() => navigate(`/home`)} className="navbar-home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1664854224/image_mmqlth.png' alt="Home" className="home-img"></img>
            </button>
            <section>
                <button onClick={() => navigate("/login")} className="navbar-btn navbar__login" style={{color: text}}>Login</button>
                <button onClick={() => navigate("/register")} className="navbar-btn navbar__register" style={{color: text}}>Register</button>
            </section>
        </section>
    )
}