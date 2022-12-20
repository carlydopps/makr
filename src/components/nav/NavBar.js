import { LoggedInNav } from "./LoggedInNav"
import { LoggedOutNav } from "./LoggedOutNav"

export const NavBar = () => {

    if (localStorage.getItem("current_user")) {
        return <LoggedInNav/>
    } else {
        return <LoggedOutNav/>
    }
}