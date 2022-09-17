// Set up all routes for login / register / home / professional profile / account / project request form

import { Outlet, Route, Routes } from "react-router-dom"
import { Account } from "../accounts/Account"
import { Makr } from "../home/Makr"
import { ProjectDetails } from "../projects/ProjectDetails"
import { ProjectForm } from "../projects/ProjectForm"
import { ProjectList } from "../projects/ProjectList"
import { ProProfile } from "../pros/ProProfile"

export const ApplicationViews = () => {

    return (
        <Routes>                
            <Route path="/" element={
                <>
                    <Makr/>
                    <Outlet/>
                </>
            }/>
            <Route path="projects" element={<ProjectList/>}/>
            <Route path="/project/:projectId/details" element={<ProjectDetails/>}/>
            <Route path="profile/:proId" element={<ProProfile/>}/>
            <Route path="account/:userId" element={<Account/>}/>
            <Route path="project-form/:proId" element={<ProjectForm/>}/>
            
        </Routes>
    )
}