// User can click an account icon in the nav bar that will display a list of route options
// User can click on a logout button

import { useNavigate } from "react-router-dom"

export const NavBar = () => {

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    const navigate = useNavigate()

    return (
        <>
            <button onClick={() => navigate(`/`)} className="navbar__button navbar__home">Home</button>
            <button onClick={() => navigate(`/projects`)} className="navbar__button navbar__projects">My Projects</button>
            <button onClick={() => navigate(`/account/${currentUser.id}`)} className="navbar__button navbar__account">Account</button>
            <button onClick={() => {
                localStorage.removeItem("current_user")
                navigate("/", {replace: true})
                }} className="navbar__button navbar__logout">Logout</button>
        </>
    )
}