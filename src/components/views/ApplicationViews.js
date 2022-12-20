import { Authorized } from "./Authorized"
import { LoggedInView } from "./LoggedInView"
import { LoggedOutView } from "./LoggedOutView"

export const ApplicationViews = () => {

    if (localStorage.getItem("current_user")) {
        return <>
            <Authorized>
                <LoggedInView/>
            </Authorized>
        </>
    } else {
        return <LoggedOutView/>
    }
}