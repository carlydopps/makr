// User can view the landing page with a summary of Makr if not logged in
// User can view the logged out nav bar
// User can click a button to start creating that will take them to the home page

import { Route, Routes } from "react-router-dom"
import { LoggedOutNav } from "./nav/LoggedOutNav"
import { ApplicationViews } from "./views/ApplicationViews"

export const LandingPage = () => {
    return (
        <Routes>
            <Route path="*" element={
                <>
                    <LoggedOutNav/>
                    <ApplicationViews/>
                    <h2>Welcome to Makr</h2>
                </>
            }/>
        </Routes>
    )
}