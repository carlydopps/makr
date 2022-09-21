// If a current user exists, display the logged in nav bar
// Else display the logged out nav bar

import { LoggedInNav } from "./LoggedInNav"
import { LoggedOutNav } from "./LoggedOutNav"

export const NavBar = () => {

    if (localStorage.getItem("current_user")) {
        return <LoggedInNav/>
    } else {
        return <LoggedOutNav/>
    }
}