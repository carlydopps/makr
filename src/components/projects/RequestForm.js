// User can click the logo and route to the home page
// User can view the logged in nav bar
// User can complete a form for project information
// User can click a button to submit a project and trigger a submitted message

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser, postRequest } from "../ApiManager"

export const RequestForm = ({pro}) => {

    const [user, setUser] = useState([])
    const [request, updateRequest] = useState({
        title: "",
        description: "",
        date: "",
        time: ""
    })

    const navigate = useNavigate()

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    useEffect(
        () => {
            getCurrentUser(currentUser.id)
                .then(data => {
                    const singleUser = data[0]
                    setUser(singleUser)})
        },
        []
    )

    const handleSubmit = (event) => {
        event.preventDefault()

        const newRequest = {
            userId: user.id,
            proId: pro.id,
            title: request.title,
            description: request.description,
            date: request.date,
            time: request.time
        }

        postRequest(newRequest)
            .then(() => navigate("/account"))
    }

    return (
        <form className="requestForm">
            <h2 className="requestForm__title">New Project Request</h2>
            <p>User: {user.name}</p>
            <p>Professional: {pro?.user?.name}</p>
            <fieldset>
                <label htmlFor="title">Project Title: </label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Title of the project"
                    value={request.title}
                    onChange={
                        (event) => {
                            const copy = {...request}
                            copy.title = event.target.value
                            updateRequest(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description: </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Detailed description of the problem"
                    value={request.description}
                    onChange={
                        (event) => {
                            const copy = {...request}
                            copy.description = event.target.value
                            updateRequest(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="date">Date: </label>
                <input
                    type="date"
                    className="form-control"
                    placeholder="Preferred date of service"
                    value={request.date}
                    onChange={
                        (event) => {
                            const copy = {...request}
                            copy.date = event.target.value
                            updateRequest(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="time">Time: </label>
                <input
                    type="time"
                    className="form-control"
                    placeholder="Preferred time of service"
                    value={request.time}
                    onChange={
                        (event) => {
                            const copy = {...request}
                            copy.time = event.target.value
                            updateRequest(copy)
                        }
                    }
                />
            </fieldset>
            <button
                onClick={(event) => handleSubmit(event)}
                className="btn__submit"
                >Submit Request</button>
        </form>
    )
    
}