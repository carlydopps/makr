// Use can enter information to register
// If user wants to register as a pro, more input fields will be displayed
// User can click a button that will create a new user account and route to their previous location
// If user registered as a pro, a new pro account will also be created

import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { checkEmail, getExpertiseTypes, postPro, postUser } from "../ApiManager"

export const Register = () => {

    const [expertiseTypes, setExpertiseTypes] = useState([])
    const [user, updateUser] = useState({
        name: "",
        email: "",
        phone: "",
        isPro: false
    })

    const[pro, updatePro] = useState({
        aboutMe: "",
        expertiseTypeId: 0,
        price: "",
        experience: ""
    })

    let navigate = useNavigate()

    useEffect(
        () => {
            getExpertiseTypes()
                .then(data => setExpertiseTypes(data))
        }
        ,[]
    )

    const registerNewPro = (userId) => {
        
        const newPro = {
            userId: userId,
            aboutMe: pro.aboutMe,
            expertiseTypeId: pro.expertiseTypeId,
            price: parseFloat(pro.price).toFixed(2),
            experience: pro.experience
        }

        postPro(newPro)
            .then(() => navigate("/"))
    }

    const registerNewUser = () => {

        const newUser = {
            name: user.name,
            email: user.email,
            phone: user.phone.replace(/\D/g, ""),
            isPro: user.isPro
        }

        postUser(newUser)
            .then(userObj => {
                if (userObj.hasOwnProperty("id")) {
                    localStorage.setItem("current_user", JSON.stringify({
                        id: userObj.id,
                        isPro: userObj.isPro
                    }))
                }
                if (userObj.isPro) {
                    registerNewPro(userObj.id)
                } else {
                    navigate("/")
                }
            })
    }

    const handleRegister = (event) => {
        event.preventDefault()
        checkEmail(user.email)
            .then(response => {
                if (response.length > 0) {
                    window.alert("Account with that email address already exists")
                }
                else {
                    registerNewUser()
                }
            })
    }

    const formatPhoneNumber = (input) => {
        if (!input) {
            return input
        }
        const phoneNumber = input.replace(/[^\d]/g, "")
        const phoneNumberLength = phoneNumber.length
        if (phoneNumberLength < 4) { return phoneNumber}
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`
        }
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6,10)}`
    }

    const handlePhoneInput = (event) => {
        const formattedPhoneNumber = formatPhoneNumber(event.target.value)
        const copy = {...user}
        copy.phone = formattedPhoneNumber
        updateUser(copy)
    }

    const proDisplay = () => {
        
        return <form>
            <fieldset>
                    <label htmlFor="aboutMe"> About Me: </label>
                    <input
                        required
                        type="text" 
                        id="aboutMe" 
                        className="form-control"
                        placeholder="About me" 
                        value={pro.aboutMe}
                        onChange={
                            (event) => {
                                const copy = {...pro}
                                copy.aboutMe = event.target.value
                                updatePro(copy)
                            }
                        } />
                </fieldset>
                <fieldset>
                    <label htmlFor="expertise"> Expertise: </label>
                    <select
                        onChange={
                            (event) => {
                                const copy = {...pro}
                                copy.expertiseTypeId = parseInt(event.target.value)
                                updatePro(copy)
                            }
                        }>
                            <option value={0}>Select expertise</option>
                            {
                                expertiseTypes.map(expertise => <option
                                key={expertise.id}
                                value={expertise.id}>
                                {expertise.name}</option>)
                            }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="price"> Price: </label>
                    <input 
                        required
                        type="text" 
                        id="price" 
                        className="form-control"
                        placeholder="$ 0.00" 
                        value={pro.price}
                        onChange={
                            (event) => {
                                const copy = {...pro}
                                copy.price = event.target.value
                                updatePro(copy)}
                        }/>
                </fieldset>
                <fieldset>
                    <label htmlFor="experience"> Years of Experience: </label>
                    <input
                        required
                        type="number" 
                        id="experience" 
                        className="form-control"
                        placeholder="Years of experience" 
                        value={pro.experience}
                        onChange={
                            (event) => {
                                const copy = {...pro}
                                copy.experience = parseInt(event.target.value)
                                updatePro(copy)
                            }
                        } />
                </fieldset>
        </form>

    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Makr</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input 
                        required autoFocus
                        type="text" 
                        id="name" 
                        className="form-control"
                        placeholder="Enter your name" 
                        value={user.name}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.name = event.target.value
                                updateUser(copy)
                            }
                        }/>
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input 
                        required
                        type="text" 
                        id="email" 
                        className="form-control"
                        placeholder="Email address" 
                        value={user.email}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.email = event.target.value
                                updateUser(copy)
                            }
                        }/>
                </fieldset>
                <fieldset>
                    <label htmlFor="phone"> Phone Number </label>
                    <input 
                        required
                        type="tel" 
                        id="phone" 
                        className="form-control"
                        placeholder="(XXX) XXX-XXXX" 
                        pattern="([0-9]){3} [0-9]{3}-[0-9]{4}" 
                        value={user.phone}
                        onChange={
                            (event) => {handlePhoneInput(event)}
                        }/>
                </fieldset>
                <fieldset>
                    <label htmlFor="accountType"></label>
                    <input 
                        onChange={(evt) => {
                            const copy = {...user}
                            copy.isPro = (evt.target.value === "true")
                            updateUser(copy)
                    }}
                        type="radio" value={false} name="accountType" id="isPro" />Makr
                    <input 
                        onChange={(evt) => {
                            const copy = {...user}
                            copy.isPro = (evt.target.value === "true")
                            updateUser(copy)
                    }}
                        type="radio" value={true} name="accountType" id="isPro" />Professional
                </fieldset>
                
            </form>
                {
                    user.isPro
                    ? proDisplay()
                    : ""
                }
            <button 
                onClick={event => handleRegister(event)}
                type="register" 
                className="btn btn__register"> Register
                
            </button>
            <section className="link--login">
                <Link to="/login">Already have an account?</Link>
            </section>
        </main>
    )
}