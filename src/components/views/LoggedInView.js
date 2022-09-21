import { Outlet, Route, Routes } from "react-router-dom"
import { Account } from "../accounts/Account"
import { Makr } from "../home/Makr"
import { LoggedInNav } from "../nav/LoggedInNav"
import { NavBar } from "../nav/NavBar"
import { ProjectDetails } from "../projects/ProjectDetails"
import { ProjectForm } from "../projects/ProjectForm"
import { ProjectList } from "../projects/ProjectList"
import { ProProfile } from "../pros/ProProfile"
import { ApplicationViews } from "./ApplicationViews"
import { Authorized } from "./Authorized"

export const LoggedInView = () => {
    return <Routes>
        <Route path="/" element={
            <>
                <Makr/>
                <Outlet/>
            </>
        }/>
        <Route path="projects" element={<ProjectList/>}/>
        <Route path="/project/:projectId/details" element={<ProjectDetails/>}/>
        <Route path="account/:userId" element={<Account/>}/>
        <Route path="profile/:proId" element={<ProProfile/>}/>
        <Route path="project-form/:proId" element={<ProjectForm/>}/>
    </Routes>
}