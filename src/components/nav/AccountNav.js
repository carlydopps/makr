// User can click a button to route to current projects
// User can click a button to route to contact information
// User can click a button to logout and route to landing page

import { Menu, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser } from "../ApiManager"

export const AccountNav = ({user}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }

    const handleLogout = () => {
        setAnchorEl(null)
        setOpen(false)
        localStorage.removeItem("current_user")
        navigate("/", {replace: true})
    }

    return <>
        <button 
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}className="navbar__button navbar__account">
            <img src={user?.profileImage} alt="Account" className="account-image"></img>
        </button>
        <Menu
                keepMounted
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >
                    <MenuItem 
                        onClick={handleClose}
                        component={Link}
                        to={`/account/${user.id}`}
                        className="accountnav-menu menu-account">
                        Account</MenuItem>
                    <MenuItem 
                        onClick={handleClose}
                        component={Link}
                        to={`/projects`}
                        className="accountnav-menu menu-projects">Projects</MenuItem>
                    <MenuItem 
                        onClick={handleLogout} 
                        className="accountnav-menu menu-logout">Logout</MenuItem>
        </Menu>
    </>
   
} 