// If a current user exists, display the logged in nav bar
// Else display the logged out nav bar

import { LoggedInNav } from "./LoggedInNav"
import { LoggedOutNav } from "./LoggedOutNav"

export const NavBar = () => {

    const localUser = localStorage.getItem("current_user")
    const currentUserObject = JSON.parse(localUser)

    if (currentUserObject) {
        return <LoggedInNav/>
    } else {
        return <LoggedOutNav/>
    }
}