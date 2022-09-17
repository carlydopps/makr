import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteProject, getAssignedMakr, getAssignedPro, getCurrentUser, getSelectedProject } from "../ApiManager"

export const ProjectDetails = () => {

    const {projectId} = useParams()
    const [project, updateProject] = useState({
        date: "",
        time: ""
    })
    const [user, setUser] = useState([])
    const [makr, setMakr] = useState([])
    const [pro, setPro] = useState([])

    const navigate = useNavigate()

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    useEffect(
        () => {
            getSelectedProject(projectId)
                .then((data) => {
                    const selectedProject = data[0]
                    updateProject(selectedProject)
                })
        },
        [projectId]
    )

    useEffect(
        () => {
            getCurrentUser(currentUser.id)
                .then(data => {
                    const singleUser = data[0]
                    setUser(singleUser)})

            getAssignedMakr(project.userId)
                .then(data => {
                    const assignedMakr = data[0]
                    setMakr(assignedMakr)})
            
            getAssignedPro(project.proId)
                .then(data => {
                    const assignedPro = data[0]
                    setPro(assignedPro)})
        },
        [project]
    )

    const returnButton = () => {
        return <button onClick={() => 
            navigate(`/projects`)}
            >Return to Project List</button>
    }

    const formatDay = () => {
        return Date(project.date).toLocaleString('en-us', {weekday:'long'}).split(' ')[0]
        
    }

    const formatDate = () => {
        let formattedDate = project.date.split("T")
        formattedDate = formattedDate[0]
        formattedDate = formattedDate.split("-")
        formattedDate = [formattedDate[1], formattedDate[2], formattedDate[0]]
        return formattedDate.join("/")    
    }

    const formatTime = () => {
        let formattedTime = project.time.split(' ')
        formattedTime = [formattedTime[0].slice(0,-3), formattedTime[1]]
        return formattedTime.join(" ")
    }

    return <>
        <header>
            <h1 className="projectDetails__header">{project.title}</h1>
        </header>
        <section>
            {
                user.isPro && user.id !== project.userId
                ? <section>
                    <p>Makr: {makr?.name}</p>
                    <a href={`mailto:${makr?.email}`}>{makr?.email}</a>
                    <p>{`(${makr?.phone?.slice(0,3)}) ${makr?.phone?.slice(3, 6)}-${makr?.phone?.slice(6,10)}`}</p>
                </section>
                : <section>
                    <p>Pro: 
                        <Link to={`/profile/${pro?.id}`}>{pro?.user?.name}</Link>
                    </p>
                </section>
            }
        </section>
        <section>
            <article>
                <h4>Description</h4>
                <p>{project.description}</p> 
            </article>
            <article>
                <h4>Scheduled Time</h4>
                <p>{formatDay()} {formatDate()} at {formatTime()}</p> 
            </article>    
        </section>
        {
            returnButton()
        }


    </>
}