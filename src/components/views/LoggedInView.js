import { Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import { Authorized } from "./Authorized"

export const LoggedInView = () => {
    return <Routes>
        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar/>
                    <ApplicationViews/>
                </>
            </Authorized>
            
        }/>
    </Routes>
}