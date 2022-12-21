import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Footer } from "../footer/Footer"
import { getSelectedProject, saveProject } from "../managers/ProjectManager"
import { getAssignedPro } from "../managers/ProManager"
import { getAssignedMakr, getCurrentUser } from "../managers/UserManager"
import "./ProjectDetails.css"

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
            
            window.scrollTo(0, 0)

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

    const handleDecision = (status) => {
        const copy = {...project}
        copy.status = status
        saveProject(copy)
            .then(() => window.location.reload(false))
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
    <main className="page-project">
    <div className="container-projectDetails">
        <section className="section-project">
            <section className="details-project">
                <h4 className="h1-projectDetails">{project.title}</h4>
                <article className="details-project_description">
                    <p className="details-project_descriptionBody">{project.description}</p> 
                </article>
                <article className="details-project_user">
                    {
                        user.isPro && user.id !== project.userId
                        ? <>
                            <div className="details-project_userInfo">
                                <h5 >Makr Details</h5>
                                <p className="details-project_userName">{makr?.name}</p>
                                <p className="details-project_userPhone">{`(${makr?.phone?.slice(0,3)}) ${makr?.phone?.slice(3, 6)}-${makr?.phone?.slice(6,10)}`}</p>
                                <a href={`mailto:${makr?.email}`} className="details-project_userEmail">{makr?.email}</a>
                            </div>
                            <img src={makr?.profileImage} className="details-project_imgProfile"/>
                        </>
                        : <>
                        <p className="details-project_userInfo">
                            Pro Details
                                <Link to={`/profile/${pro?.id}`}
                                >{pro?.user?.name}</Link>
                        </p>
                        <img src={pro?.user?.profileImage} className="details-project_imgProfile"/>
                        </>
                    }
                    
                </article>
                <article className="details-project_schedule">
                    <h5>Session Details</h5>
                    <p className="details-project_dateTime">{formatDay()} {formatDate()} at {formatTime()}</p> 
                </article>
                <div className="details-project_approval">
                    {
                        user.isPro && user.id !== project.userId
                        ? 
                            project.status === "Pending"
                            ? <>
                            <button onClick={() => handleDecision("Approved")}className="btn-approve">Approve</button>
                            <button onClick={() => handleDecision("Cancelled")}className="btn-deny">Deny</button>
                            </>
                            : project.status === "Approved"
                            ?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-approved" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-cancelled" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        : ""
                    }
                </div>
                <button onClick={() => navigate(`/projects`)}
                className="btn-return"
                >Return to Project List</button>    
            </section>
            <div className="details-project_imgFrame">
                <img src={project.image} className="details-project_img"/>
            </div>
        </section>
    </div>
    </main>
    <Footer/>
    </>
}