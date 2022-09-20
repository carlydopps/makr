// User can click a button to route to current projects
// User can click a button to route to contact information
// User can click a button to logout and route to landing page

import { Menu, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../ApiManager"

export const AccountNav = () => {

    const [anchor, setAnchor] = useState(false)
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

    const handleClose = () => {
        setAnchor(false)
    }

    const handleClick = (event) => {
        setAnchor(event.target)
    }

    return <>
        <button onClick={handleClick}className="navbar__button navbar__account">
            <img src={user?.profileImage} alt="Account" className="account-image"></img>
        </button>
        <Menu
            keepMounted
            anchor={anchor}
            onClose={handleClose}
            open={Boolean(anchor)}>
                <MenuItem onClick={navigate(`/account/${currentUser.id}`)}
                className="accountnav-menu menu-account">Account</MenuItem>
                <MenuItem onClick={() => navigate(`/projects`)}
                    className="accountnav-menu menu-projects">Projects</MenuItem>
                <MenuItem onClick={() => {
                    localStorage.removeItem("current_user")
                    navigate("/", {replace: true})
                    }} className="accountnav-menu menu-logout">Logout</MenuItem>
        </Menu>
    </>
}

// } 