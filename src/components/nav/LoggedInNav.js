import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getCurrentUser } from "../managers/UserManager"
import { AccountNav } from "./AccountNav"
import "./LoggedInNav.css"

export const LoggedInNav = () => {

    const [user, setUser] = useState({})
    const [background, setBackground] = useState("")
    const [text, setText] = useState("")
    const location = useLocation()

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            getCurrentUser(currentUser.id)
            .then((data) => {
                const singleUser = data[0]
                setUser(singleUser)
            })
        },
        []
    )

    useEffect(
        () => {
            if (window.location.pathname === "/projects") {
                setBackground('#2F3F54')
                setText('white');
            } else {
                setBackground('#FF9659')
                setText('white')
            }
        },
        [location]
    )

    return (
        <section className="navbar-in" style={{backgroundColor: background}}>
            <button onClick={() => navigate(`/`)} className="navbar__home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1664854224/image_mmqlth.png' alt="Home" className="home-image"></img>
            </button>
            <section className="navbar-right">
                <button onClick={() => navigate(`/`)} style={{color: text}} className="navbar__button navbar__pros">PROS</button>
                <button onClick={() => navigate(`/projects`)} style={{color: text}} className="navbar__button navbar__projects">PROJECTS</button>
            <AccountNav user={user}/>
            </section>
        </section>
    )
}