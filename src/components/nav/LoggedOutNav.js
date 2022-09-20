// // User who is not logged in can click a sign up or login button in the nav bar that will route to the respective page

// import { useNavigate } from "react-router-dom"

// export const LoggedOutNav = () => {

//     const navigate = useNavigate()

//     return (
//         <>
//             <button onClick={() => navigate("/login")} className="navbar__button navbar__login">Login</button>
//             <button onClick={() => navigate("/register")} className="navbar__button navbar__register">Register</button>
//         </>
//     )
// }