// Use can enter information to register
// If user wants to register as a pro, more input fields will be displayed
// User can click a button that will create a new user account and route to their previous location
// If user registered as a pro, a new pro account will also be created

import { useState } from "react"
import { useNavigate } from "react-router"

export const Register = () => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phone: "",
        isPro: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(newUser => {
                if (newUser.hasOwnProperty("id")) {
                    localStorage.setItem("current_user", JSON.stringify({
                        id: newUser.id,
                        isPro: newUser.isPro
                    }))

                    navigate("/home")
                }
            })
            .then(

            )
    }

    const handleRegister = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    window.alert("Account with that email address already exists")
                }
                else {
                    registerNewUser()
                }
            })
    }

    const updateUser = (event) => {
        const copy = {...user}
        copy[event.target.id] = event.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Makr</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isPro = evt.target.value
                        setUser(copy)
                    }}
                        type="radio" value={false} name="accountType" id="isPro" />Makr
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isPro = evt.target.value
                        setUser(copy)
                    }}
                        type="radio" value={true} name="accountType" id="isPro" />Professional
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}