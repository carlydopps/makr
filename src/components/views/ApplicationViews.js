// Set up all routes for login / register / home / professional profile / account / project request form

import { Outlet, Route, Routes } from "react-router-dom"
import { Account } from "../accounts/Account"
import { LandingPage } from "../home/LandingPage"
import { Makr } from "../home/Makr"
import { RequestForm } from "../projects/RequestForm"
import { ProProfile } from "../pros/ProProfile"

export const ApplicationViews = () => {

    return (
        <Routes>
            {
                localStorage.getItem("current_user")
                ? <Route path="/" element={
                    <>
                        <Makr/>
                        <Outlet/>
                    </>
                }/>
                : <Route path="/" element={
                    <>
                        <LandingPage/>
                        <Outlet/>
                    </>
                }/>
            }
            <Route path="home" element={<Makr/>}/>
            <Route path="profile/:proId" element={<ProProfile/>}/>
            <Route path="account" element={<Account/>}/>
            <Route path="request-form" element={<RequestForm/>}/>
        </Routes>
    )
}