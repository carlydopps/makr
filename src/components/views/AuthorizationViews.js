import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"


export const AuthorizationViews = () => {
    return<Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
    </Routes>


}