import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./components/views/ApplicationViews"

export const App = () => {
    return <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="*" element={
            <>
                <NavBar/>
                <ApplicationViews/>
            </>
        }/>
    </Routes>
}