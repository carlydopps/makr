// Set up all routes for login / register / home / professional profile / account / project request form

import { Outlet, Route, Routes } from "react-router-dom"
import { Account } from "../accounts/Account"
import { Makr } from "../home/Makr"
import { ProjectDetails } from "../projects/ProjectDetails"
import { ProjectForm } from "../projects/ProjectForm"
import { ProjectList } from "../projects/ProjectList"
import { ProProfile } from "../pros/ProProfile"
import { Authorized } from "./Authorized"
import { LoggedInView } from "./LoggedInView"
import { LoggedOutView } from "./LoggedOutView"

export const ApplicationViews = () => {

    if (localStorage.getItem("current_user")) {
        return <>
            <Authorized>
                <LoggedInView/>
            </Authorized>
        </>
    } else {
        return <LoggedOutView/>
    }
}