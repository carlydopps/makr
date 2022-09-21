// User can view the landing page with a summary of Makr if not logged in
// User can view the logged out nav bar
// User can click a button to start creating that will take them to the home page

import { useNavigate } from "react-router-dom"

export const LandingPage = () => {

    const navigate = useNavigate()

    return (
        <>
                <h2>Welcome to Makr Landing Page</h2>
                <button onClick={() => navigate("/home")}>Start creating</button>
        </>
    )
}
