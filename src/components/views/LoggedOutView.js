import { Outlet, Route, Routes } from "react-router-dom"
import { Makr } from "../home/Makr"
import { ProjectForm } from "../projects/ProjectForm"
import { ProProfile } from "../pros/ProProfile"
import { LandingPage } from "../home/LandingPage"

export const LoggedOutView = () => {
    return <Routes>
        <Route path="/" element={
            <>
                <LandingPage/>
                <Outlet/>
            </>
        }/>
        <Route path="/home" element={<Makr/>}/>
        <Route path="profile/:proId" element={<ProProfile/>}/>
        <Route path="project-form/:proId" element={<ProjectForm/>}/>
    </Routes>
}