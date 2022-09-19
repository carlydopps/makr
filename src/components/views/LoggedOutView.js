import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { Makr } from "../home/Makr"
import { ProjectForm } from "../projects/ProjectForm"
import { ProProfile } from "../pros/ProProfile"
import { LandingPage } from "../home/LandingPage"
import { LoggedOutNav } from "../nav/LoggedOutNav"
import { Authorized } from "./Authorized"
import { LoggedInView } from "./LoggedInView"

export const LoggedOutView = () => {
    return <>
    <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="*" element={
                <>
                    <LoggedOutNav/>
                    <LandingPage/>
                    <Outlet/>
                    <Routes>
                        <Route path="/home" element={<Makr/>}/>
                        <Route path="profile/:proId" element={<ProProfile/>}/>
                        <Route path="project-form/:proId" element={<ProjectForm/>}/>
                    </Routes>
                    
                </>
        }/>
    </Routes>
    </>
}