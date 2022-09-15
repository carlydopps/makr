// User can click an account icon in the nav bar that will display a list of route options
// User can click on a logout button

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {

    const navigate = useNavigate()

    return (
        <>
            <button onClick={() => navigate("/account")} className="navbar__button navbar__account">Account</button>
            <button onClick={() => {
                localStorage.removeItem("current_user")
                navigate("/", {replace: true})
                }} className="navbar__button navbar__logout">Logout</button>
        </>
    )
}