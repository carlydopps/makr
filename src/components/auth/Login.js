import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Footer } from "../footer/Footer"
import "./Auth.css"

export const Login = () => {

    const [email, setEmail] = useState([])
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUser => {
                if (foundUser.length === 1) {
                    const user = foundUser[0]
                    localStorage.setItem("current_user", JSON.stringify({
                        id: user.id,
                        isPro: user.isPro
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return <>
        <section>
                <button onClick={() => navigate(`/home`)} className="navbar-home">
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1663639606/Screen_Shot_2022-09-19_at_9.05.23_PM-removebg-preview_cvnxt3.png' alt="Home" className="home-img"></img>
                </button>
        </section>
        <div className="page-auth">
        <main className="container-login">
            <section className="container-auth">
                <form className="form--login" onSubmit={handleLogin}>
                    <h2>Welcome back</h2>
                    <h5>Please sign in</h5>
                    <fieldset>
                        <label htmlFor="inputEmail"></label>
                        <input type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn-login">
                            Log in
                        </button>
                    </fieldset>
                </form>
                <section className="link--register">
                    <Link to="/register">Register</Link>
                </section>
            </section>
            <section className="img-container-register">
                <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1663819821/Registration_page_gh48qi.png" className="img-register"/>
            </section>
        </main>
        </div>
        <Footer/>
    </>
}