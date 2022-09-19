// User can click the logo and route to the home page
// User can view the logged in nav bar
// User can complete a form for project information
// User can click a button to submit a project and trigger a submitted message

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentUser, getSelectedPro, postProject } from "../ApiManager"
import "./ProjectForm.css"
import { Image } from 'cloudinary-react'

export const ProjectForm = () => {

    const {proId} = useParams()
    const [pro, setPro] = useState([])
    const [user, setUser] = useState([])
    const [project, updateProject] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        image: ""
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

    useEffect(
        () => {
            getSelectedPro(proId)
                .then(data => {
                    const selectedPro = data[0]
                    setPro(selectedPro)
                })
        }, 
        [proId]
    )

    const handleSubmit = (event) => {
        event.preventDefault()

        const newProject = {
            userId: user.id,
            proId: pro.id,
            title: project.title,
            description: project.description,
            date: project.date,
            time: new Date(project.date).toLocaleTimeString('en-us'),
            image: project.image
        }

        postProject(newProject)
            .then(() => navigate(`/projects`))
    }

    let myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dupram4w7",
            uploadPreset: "huvsusnz"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info)

                const copy = {...project}
                copy.image = result.info.url
                updateProject(copy)
            }
        }
    )

    const showWidget = (myWidget) => {
        myWidget.open()
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
                    type="datetime-local"
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
            <img src={project.image}/>
            <button onClick={() => showWidget(myWidget)}
            className="cloudinary-button">
                Upload files
            </button>
            <button
                onClick={(event) => handleSubmit(event)}
                className="btn__submit"
                >Submit Request</button>
        </form>
    )
    
}