// User can enter login information
// User can click a button that will log them in and route to their previous location
// User can click a link to reroute to the register page

import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
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
                <button onClick={() => navigate(`/home`)} className="navbar__button navbar__home">
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1663639606/Screen_Shot_2022-09-19_at_9.05.23_PM-removebg-preview_cvnxt3.png' alt="Home" className="home-image"></img>
                </button>
        </section>
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn__login">
                            Log in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Register</Link>
            </section>
        </main>
    </>
}