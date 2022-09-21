// User can click an account icon in the nav bar that will display a list of route options
// User can click on a logout button

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../ApiManager"
import { AccountNav } from "./AccountNav"
import "./LoggedInNav.css"

export const LoggedInNav = () => {

    const [user, setUser] = useState({})

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

    return (
        <section className="navbar-in">
            <button onClick={() => navigate(`/`)} className="navbar__button navbar__home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1663639606/Screen_Shot_2022-09-19_at_9.05.23_PM-removebg-preview_cvnxt3.png' alt="Home" className="home-image"></img>
            </button>
            <section className="navbar-right">
                <button onClick={() => navigate(`/projects`)} className="navbar__button navbar__projects">PROJECTS</button>
            <AccountNav user={user}/>
            </section>
        </section>
    )
}