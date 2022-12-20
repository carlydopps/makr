import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getExpertiseTypes } from "../managers/ExpertiseManager"
import { Footer } from "../footer/Footer"
import { getCurrentPro, saveEditedPro } from "../managers/ProManager"
import { getCurrentUser, saveEditedUser } from "../managers/UserManager"
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

    const defaultDisplay = () => {

        return <>
            <section className="body-contact">
                <h4>Contact Information</h4>
                <div className="body-contactLayout">
                    <div className="body-contactLayout_titles">
                        <p>Email:</p>
                        <p>Phone:</p>
                        <p>Account:</p>
                    </div>
                    <div className="body-contactLayout_info">
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>{currentUser.isPro ? "Pro" : "Makr"}</p>
                    </div>
                </div>
                
                {
                    currentUser.isPro
                    ? <section className="body-proDetails">
                        <h4>Professional Details</h4>
                        <p className="body-contactLayout_titles">{pro.aboutMe}</p>
                        <div className="body-contactLayout">
                            <div className="body-contactLayout_titles">
                                <p>Expertise:</p>
                                <p>Hourly Rate:</p>
                                <p>Years of Experience:</p>
                            </div>
                            <div className="body-contactLayout_info">
                                <p>{pro.expertiseType?.name}</p>
                                <p>{pro.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})}</p>
                                <p>{pro.experience}</p>
                            </div>
                        </div>
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
        <h4 className="accountForm__title">Edit Profile Information</h4>
        <button onClick={(event) => showWidget(event)}
                    className="btn-accountPhoto">
                    Update photo
                </button>
        <fieldset>
            <div className="form-group">
                <label className="label-accountEdit" htmlFor="email">Email: </label>
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
                <label className="label-accountEdit" htmlFor="phone">Phone Number: </label>
                <input 
                    type="tel"
                    className="form-control"
                    pattern="([0-9]){3} [0-9]{3}-[0-9]{4}"
                    placeholder={user.phone}
                    value={user.phone}
                    onChange={
                        (event) => {handlePhoneInput(event)}
                    } />
            </div>
        </fieldset>
        {
            currentUser.isPro
            ?<section>
               <fieldset>
                    <label className="label-accountEdit" htmlFor="aboutMe"> About Me: </label>
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
                    <label className="label-accountEdit" htmlFor="expertise"> Expertise: </label>
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
                    <label className="label-accountEdit" htmlFor="price"> Price: </label>
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
                    <label className="label-accountEdit" htmlFor="experience"> Years of Experience: </label>
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
            <div className="img-stack">
                <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1664860297/Re-Love_Project_before_after_copy_lkh6ew.png" className="img-stack_bottom"/>
                <img src={user.profileImage} className="img-stack_top"/>
            </div>
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