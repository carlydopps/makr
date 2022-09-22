// User can view contact information
// User can edit contact information
// User can view current projects
// Makr user can delete a project
// User can click the logo and route to the home page
// User can view the logged in nav bar

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentPro, getCurrentUser, getExpertiseTypes, saveEditedPro, saveEditedUser } from "../ApiManager"
import { Footer } from "../footer/Footer"
import "./Account.css"

export const Account = () => {
    
    const {userId} = useParams()
    const [clickStatus, updateClickStatus] = useState(false)
    const [expertiseTypes, setExpertiseTypes] = useState([])
    const [user, updateUser] = useState({
        email: "",
        phone: "",
        isPro: "",
        profileImage: ""
    })
    const [pro, updatePro] = useState({
        aboutMe: "",
        expertiseTypeId: 0,
        price: "",
        experience: ""
    })

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    const firstName = user?.name?.split(" ")[0]

    const renderUser = () => {
        getCurrentUser(userId)
            .then(data => {
                const singleUser = data[0]
                updateUser(singleUser)})
        getCurrentPro(currentUser.id)
            .then(data => {
                const currentPro = data[0]
                updatePro(currentPro)
            })
    }

    useEffect(
        () => {
            renderUser()
        },
        [userId]
    )

    useEffect(
        () => {
            getExpertiseTypes()
                .then(data => setExpertiseTypes(data))
        },
        []
    )

    const handleSave = (event) => {
        event.preventDefault()

        saveEditedUser(user)
            .then(() => {
                const updatedPro = {...pro}
                delete updatedPro.expertiseType
                delete updatedPro.user
                saveEditedPro(updatedPro)
            })
            .then(() => updateClickStatus(false))
            .then(() => window.location.reload(false))
    }

    const handleCancel = (event) => {
        event.preventDefault()

        updateClickStatus(false)
        renderUser()
    }

    const showWidget = (event) => {
        
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dupram4w7",
            uploadPreset: "huvsusnz"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                const copy = {...user}
                copy.profileImage = result.info.url
                updateUser(copy)
            }})
            widget.open()
    }

    const defaultDisplay = () => {

        return <>
            <section className="body-contact">
                <h3>Contact Information</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {`(${user.phone.slice(0,3)}) ${user?.phone?.slice(3, 6)}-${user.phone.slice(6,10)}`}</p>
                <p>Account Type: {currentUser.isPro ? "Pro" : "Makr"}</p>
                {
                    currentUser.isPro
                    ? <section>
                        <h3>Professional Details</h3>
                        <p>About Me: {pro.aboutMe}</p>
                        <p>Expertise: {pro.expertiseType?.name}</p>
                        <p>Hourly Rate: {pro.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})}</p>
                        <p>Years of Experience: {pro.experience}</p>
                    </section>
                    : ""
                    
                }
                <button onClick={() => updateClickStatus(true)} className="btn-editProfile">Edit Profile</button>
            </section>
        </>
    }

    const editDetails = () => {
        return <section className="body-contact">
        <form className="accountForm">
        <h2 className="accountForm__title">Edit Profile Information</h2>
        <button onClick={(event) => showWidget(event)}
                    className="btn-accountPhoto">
                    Update photo
                </button>
        <fieldset>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder={user.email}
                    value={user.email}
                    onChange={
                        (event) => {
                            const copy = {...user}
                            copy.email = event.target.value
                            updateUser(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="phone">Phone Number: </label>
                <input 
                    type="text"
                    className="form-control"
                    placeholder={user.phone}
                    value={user.phone}
                    onChange={
                        (event) => {
                            const copy = {...user}
                            copy.phone = event.target.value
                            updateUser(copy)
                        }
                    } />
            </div>
        </fieldset>
        {
            currentUser.isPro
            ?<section>
               <fieldset>
                    <label htmlFor="aboutMe"> About Me: </label>
                    <input
                        required
                        type="text" 
                        id="aboutMe" 
                        className="form-control"
                        placeholder={pro.aboutMe}
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
                            }}
                        className="form-control">
                            <option value={pro.expertiseTypeId}>{pro.expertiseType.name}</option>
                            {
                                expertiseTypes.map(expertise => <option
                                key={expertise.id}
                                value={expertise.id}
                                className="form-control">
                                {expertise.name}</option>)
                            }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="price"> Price: </label>
                    <input 
                        required
                        type="number" 
                        id="price" 
                        className="form-control"
                        placeholder="$ 0.00"
                        value={pro.price}
                        onChange={
                            (event) => {
                                const copy = {...pro}
                                copy.price = parseFloat(event.target.value)
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
                        placeholder="0"
                        value={pro.experience}
                        onChange={
                            (event) => {
                                const copy = {...pro}
                                copy.experience = parseInt(event.target.value)
                                updatePro(copy)
                            }
                        } />
                </fieldset>
            </section>
            :""
        }
        <button 
            onClick={(event) => handleSave(event)}
            className="btn-accountSave">
            Save
        </button>
        <button 
            onClick={(event) => handleCancel(event)}
            className="btn-accountCancel">
            Cancel
        </button>
    </form>
    </section>
    }


    return <>
        <main className="main-account">
            <img src={user.profileImage} className="image-profile"/>
            <section className="body-account">
                <h1 className="h1-account">Hi, {firstName}!</h1>
                {
                    clickStatus
                    ? editDetails()
                    : defaultDisplay()
                }
            </section>
        </main>
        <Footer/>
    </>
}