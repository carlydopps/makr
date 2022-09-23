import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteProject, getAssignedMakr, getAssignedPro, getCurrentUser, getSelectedProject } from "../ApiManager"
import { Footer } from "../footer/Footer"
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
    <div className="page-project">
    <main className="container-projectDetails">
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
                                <a href={`mailto:${makr?.email}`}>{makr?.email}</a>
                                <p className="details-project_userPhone">{`(${makr?.phone?.slice(0,3)}) ${makr?.phone?.slice(3, 6)}-${makr?.phone?.slice(6,10)}`}</p>
                            </div>
                            <img src={makr?.profileImage} className="details-project_imageProfile"/>
                        </>
                        : <>
                        <p>Pro: 
                                <Link to={`/profile/${pro?.id}`}>{pro?.user?.name}</Link>
                        </p>
                        <img src={pro?.user?.profileImage}/>
                        </>
                    }
                    
                </article>
                <article className="details-project_schedule">
                    <h5>Session Details</h5>
                    <p className="details-project_dateTime">{formatDay()} {formatDate()} at {formatTime()}</p> 
                </article>    
            </section>
            <div className="details-project_imageFrame">
                <img src={project.image} className="details-project_image"/>
            </div>
        </section>
        <button onClick={() => navigate(`/projects`)}
            className="btn-return"
            >Return to Project List</button>
    </main>
    </div>
    <Footer/>
    </>
}