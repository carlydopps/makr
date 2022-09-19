// User can click an account icon in the nav bar that will display a list of route options
// User can click on a logout button

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../ApiManager"
import "./NavBar.css"

export const NavBar = () => {

    const [user, setUser] = useState({})

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

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

    const navigate = useNavigate()

    return (
        <>
            <button onClick={() => navigate(`/`)} className="navbar__button navbar__home">Home</button>
            <button onClick={() => navigate(`/projects`)} className="navbar__button navbar__projects">My Projects</button>
            <button onClick={() => navigate(`/account/${currentUser.id}`)} className="navbar__button navbar__account">
                <img src={user?.profileImage} alt="Account" className="navbar__image"></img>
            </button>
            <button onClick={() => {
                localStorage.removeItem("current_user")
                navigate("/", {replace: true})
                }} className="navbar__button navbar__logout">Logout</button>
        </>
    )
}