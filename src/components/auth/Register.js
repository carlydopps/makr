import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { getExpertiseTypes } from "../managers/ExpertiseManager"
import { Footer } from "../footer/Footer"
import { postPro } from "../managers/ProManager"
import { checkEmail, postUser } from "../managers/UserManager"

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
            isPro: user.isPro,
            profileImage: "https://res.cloudinary.com/dupram4w7/image/upload/v1663620931/Screen_Shot_2022-09-19_at_2_ey3w9e.png"
            
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
        
        return <form className="form-register">
            <fieldset>
                    <label htmlFor="aboutMe"></label>
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
                    <label htmlFor="expertise"></label>
                    <select
                        onChange={
                            (event) => {
                                const copy = {...pro}
                                copy.expertiseTypeId = parseInt(event.target.value)
                                updatePro(copy)
                            }
                        }
                        className="form-control">
                            <option value={0}
                                className="form-control">
                                Select expertise</option>
                            {
                                expertiseTypes.map(expertise => <option
                                key={expertise.id}
                                value={expertise.id}>
                                {expertise.name}</option>)
                            }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="price"> Hourly Rate: </label>
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
                    <label htmlFor="experience"></label>
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

    return <>
        <section>
                <button onClick={() => navigate(`/home`)} className="navbar-home">
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1663639606/Screen_Shot_2022-09-19_at_9.05.23_PM-removebg-preview_cvnxt3.png' alt="Home" className="home-img"></img>
                </button>
        </section>
        <div className="page-auth">
        <main style={{ textAlign: "center" }} className="container-register">
            <section className="container-auth">
            <form className="form--login" onSubmit={handleRegister}>
                <section className="header-auth">
                    <h2 className="h3 mb-3 font-weight-normal">Welcome to Makr</h2>
                </section>
                
                <fieldset>
                    <label htmlFor="name"></label>
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
                    <label htmlFor="email"></label>
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
                    <label htmlFor="phone"></label>
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
                <fieldset className="input-accountType">
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
                className="btn-register"> Register
                
            </button>
            <section className="link--login">
                <Link to="/login">Already have an account?</Link>
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