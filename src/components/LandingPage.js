// User can view the landing page with a summary of Makr if not logged in
// User can view the logged out nav bar
// User can click a button to start creating that will take them to the home page

import { LoggedOutNav } from "./nav/LoggedOutNav"

export const LandingPage = () => {
    return (
        <>
            <LoggedOutNav/>
            <h2>Welcome to Makr</h2>
        </>
    )
}