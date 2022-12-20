import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProjects } from "../managers/ProjectManager"
import { ProjectListMakr } from "./ProjectListMakr"

export const ProjectListPro = ({userId, projectType}) => {
    
    const [projects, setProjects] = useState([])
    const [status, updateStatus] = useState("all")
    const [filteredProjects, updateFilteredProjects] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {                
            getProjects()
            .then(projects => {
                const proProjects = projects.filter(project => project.pro.userId === userId)
                setProjects(proProjects)})
        },
        []
    )

    useEffect(
        () => {
            updateFilteredProjects(projects)
        }, [projects]
    )

    useEffect(
        () => {
            if (status === "all") {
                updateFilteredProjects(projects)
            } else {
                const selectedProjects = projects.filter(project => project.status === status)
                updateFilteredProjects(selectedProjects)
            }
        }, [status]
    )

    const formatDay = (project) => {
        return Date(project.date).toLocaleString('en-us', {weekday:'long'}).split(' ')[0]
        
    }

    const formatDate = (project) => {
        let formattedDate = project.date.split("T")
        formattedDate = formattedDate[0]
        formattedDate = formattedDate.split("-")
        formattedDate = [formattedDate[1], formattedDate[2]]
        return formattedDate.join("/")    
    }

    const formatTime = (project) => {
        let formattedTime = project.time.split(' ')
        formattedTime = [formattedTime[0].slice(0,-3), formattedTime[1]]
        return formattedTime.join(" ")
    }

    return <>
        { projectType === "pro"
            ? <>
                <div className="project_list_body">
                <aside className="status-filter">
                    <h5>Filter</h5>
                    <button onClick={() => updateStatus("Approved")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-approved" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                    Approved</button>
                    <button onClick={() => updateStatus("Pending")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-pending" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    Pending</button>
                    <button onClick={() => updateStatus("all")}>View All</button>
                    <button><svg className="svg-filler"></svg></button>
                </aside>
                {filteredProjects.length > 0
                    ? <section className="list-projectsDisplay">
                    {
                        filteredProjects.map(
                            (project) => 
                            { if (project.status !== "Cancelled") {
                                return <div className="project" key={"makrProject--${project.id}"}>
                                <div className="header-project">
                                    <img src={project.image} className="img-projectPreview"/>
                                    <button onClick={() => navigate(`/project/${project.id}/details`)} className="btn-project_view">View Details</button>
                                    {
                                        project.status === "Approved"
                                        ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-approved" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-pending" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                        </svg>
                                    }
                                </div>
                                <div className="body-projectPreview">
                                    <p className="project-details_title">{project.title}</p>
                                    <div className="body-projectPreview_date">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                        </svg>
                                        <p className="project-details_date">{formatTime(project)} on {formatDay(project)} {formatDate(project)}</p>
                                    </div>
                                </div>
                            </div>}}
                    )}
                    </section>
                    : <div className="message-noProjects">
                        <p className="message-project">You have the day off! </p>
                        <p className="message-project">Your project list is currently empty.</p>
                    </div>
                }
                </div>
            </>
            : <ProjectListMakr userId={userId}/>
        }
        
    </>
}
