// Set up all routes for login / register / home / professional profile / account / project request form

import { Outlet, Route, Routes } from "react-router-dom"
import { Account } from "../accounts/Account"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { LandingPage } from "../home/LandingPage"
import { Makr } from "../home/Makr"
import { Profile } from "../profiles/Profile"
import { ProjectForm } from "../projects/ProjectForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <LandingPage/>
                    <Outlet/>
                </>
            }/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="home" element={<Makr/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="account" element={<Account/>}/>
            <Route path="form" element={<ProjectForm/>}/>
        </Routes>
    )
}