import { Route, Routes } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./components/views/ApplicationViews"

export const App = () => {
    return <Routes>
        <Route path="*" element={
            <>
                <NavBar/>
                <ApplicationViews/>
            </>
        }/>
    </Routes>
}