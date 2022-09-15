// User can click the logo and route to the home page
// User can view the logged in nav bar
// User can complete a form for project information
// User can click a button to submit a project and trigger a submitted message

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser, postProject } from "../ApiManager"

export const ProjectForm = ({pro}) => {

    const [user, setUser] = useState([])
    const [project, updateProject] = useState({
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

        const newProject = {
            userId: user.id,
            proId: pro.id,
            title: project.title,
            description: project.description,
            date: project.date,
            time: project.time
        }

        postProject(newProject)
            .then(() => navigate("/account"))
    }

    return (
        <form className="projectForm">
            <h2 className="projectForm__title">New Project Request</h2>
            <p>User: {user.name}</p>
            <p>Professional: {pro?.user?.name}</p>
            <fieldset>
                <label htmlFor="title">Project Title: </label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Title of the project"
                    value={project.title}
                    onChange={
                        (event) => {
                            const copy = {...project}
                            copy.title = event.target.value
                            updateProject(copy)
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
                    value={project.description}
                    onChange={
                        (event) => {
                            const copy = {...project}
                            copy.description = event.target.value
                            updateProject(copy)
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
                    value={project.date}
                    onChange={
                        (event) => {
                            const copy = {...project}
                            copy.date = event.target.value
                            updateProject(copy)
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
                    value={project.time}
                    onChange={
                        (event) => {
                            const copy = {...project}
                            copy.time = event.target.value
                            updateProject(copy)
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