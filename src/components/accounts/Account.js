// User can view contact information
// User can edit contact information
// User can view current projects
// Makr user can delete a project
// User can click the logo and route to the home page
// User can view the logged in nav bar

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentUser, saveEditedUser } from "../ApiManager"
import { ProjectListMakr } from "../projects/ProjectListMakr"
import { ProjectListPro } from "../projects/ProjectListPro"

export const Account = () => {

    const {userId} = useParams()
    const [clickStatus, updateClickStatus] = useState(false)
    const [accountType, updateAccountType] = useState([])
    const [user, updateUser] = useState({
        email: "",
        phone: "",
        isPro: ""
    })

    const navigate = useNavigate()
    const firstName = user?.name?.split(" ")[0]

    useEffect(
        () => {
            getCurrentUser(userId)
                .then(data => {
                    const singleUser = data[0]
                    updateUser(singleUser)
                    updateAccountType(singleUser.isPro)})

        },
        [userId]
    )

    const handleSave = (event) => {
        event.preventDefault()

        saveEditedUser(user)
            .then(() => updateClickStatus(false))
    }

    const defaultDisplay = () => {
        return <>
            <section>
                <h3>Contact Information</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Account Type: {user.isPro ? "Pro" : "Makr"}</p>
                <button onClick={() => updateClickStatus(true)}>Edit Contact Information</button>
            </section>
            <h3>My Projects</h3>
            <article>
                <ul>
                {
                    user.isPro
                    ? <ProjectListPro user={user}/>
                    : <ProjectListMakr user={user}/>
                }
                </ul>
            </article>
        </>
    }

    const editDetails = () => {
        return <form className="accountForm">
        <h2 className="accountForm__title">Edit Contact Information</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                    required autoFocus
                    type="text"
                    className="email__update"
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
                    className="phone__update"
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
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Account Type: </label>
                <input 
                    checked={user.isPro ? false : true}
                    onChange={
                        (event) => {
                            const copy = {...user}
                            copy.isPro = event.target.checked
                            updateUser(copy)
                        }
                    } 
                    type="radio"
                    name="accountType"
                />Makr
                <input 
                    checked={user.isPro ? true : false}
                    onChange={
                        (event) => {
                            const copy = {...user}
                            copy.isPro = event.target.checked
                            updateUser(copy)
                        }
                    } 
                    type="radio"
                    name="accountType"
                />Professional
            </div>
        </fieldset>
        <button 
            onClick={(event) => handleSave(event)}
            className="btn btn-primary">
            Save
        </button>
    </form>
    }


    return (
        <>
            <h1>Hello, {firstName}</h1>
            <section>
                {
                    clickStatus
                    ? editDetails()
                    : defaultDisplay()
                }
            </section>
        </>
    )
}