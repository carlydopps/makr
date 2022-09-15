import { Outlet, Route, Routes } from "react-router-dom"
import { Account } from "../accounts/Account"
import { LandingPage } from "../home/LandingPage"
import { Makr } from "../home/Makr"
import { Profile } from "../profiles/Profile"
import { ProjectForm } from "../projects/RequestForm"

export const ComponentViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <LandingPage/>
                    <Outlet/>
                </>
            }/>
            <Route path="home" element={<Makr/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="account" element={<Account/>}/>
            <Route path="form" element={<ProjectForm/>}/>
        </Routes>
    )
}