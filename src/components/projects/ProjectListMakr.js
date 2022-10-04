import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteProject, getMakrProjects } from "../ApiManager"

export const ProjectListMakr = ({userId}) => {
    
    const [projects, setProjects] = useState([])
    const [status, updateStatus] = useState("all")
    const [filteredProjects, updateFilteredProjects] = useState([])
    const [feedback, setFeedback] = useState("")

    const navigate = useNavigate()

    const renderProjects = () => {
        getMakrProjects(userId)
                .then(projects => {
                    const sortedProjects = projects.sort((a, b) => a.status === "Cancelled" ? 1 : -1)
                    setProjects(sortedProjects)
                })
    }
    useEffect(
        () => {                
            renderProjects()
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

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const deleteButton = (projectId) => {
        return <button onClick={() => {
            deleteProject(projectId)
            .then(() => {
                setFeedback("Project successfully deleted")
            })
                .then(renderProjects)
        }} className="btn-project_delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
        </button>
    }

    const formatDay = (project) => {
        return Date(project.date).toLocaleString('en-us', {weekday:'long'}).split(' ')[0]
        
    }

    const formatDate = (project) => {
        let formattedDate = project.date.split("T")
        formattedDate = formattedDate[0]
        formattedDate = formattedDate.split("-")
        formattedDate = [formattedDate[1], formattedDate[2], formattedDate[0]]
        return formattedDate.join("/")    
    }

    const formatTime = (project) => {
        let formattedTime = project.time.split(' ')
        formattedTime = [formattedTime[0].slice(0,-3), formattedTime[1]]
        return formattedTime.join(" ")
    }

    return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
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
            <button onClick={() => updateStatus("Cancelled")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-cancelled" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            Cancelled</button>
            <button onClick={() => updateStatus("all")}>View All</button>
        </aside>
        {
            filteredProjects.length > 0
            ? <section className="list-projectsDisplay">
            {
                filteredProjects.map(
                    (project) => <div className="project" key={project.id}>
                        <div className="project-header">
                            <img src={project.image} className="image-projectPreview" alt="Project Image"/>
                            <button onClick={() => navigate(`/project/${project.id}/details`)} className="btn-project_view">View Details</button>
                            {
                                project.status === "Approved"
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-approved" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                              </svg>
                                : project.status === "Pending"
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-pending" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                              </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svg-cancelled" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
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
                        {deleteButton(project.id)}
                    </div>
            )}
            </section>
            :<section className="message-noProjects">
                <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1664845065/Screen_Shot_2022-10-03_at_7.56.57_PM_shfhrf.png"></img>
                <p className="message-project">Start creating!</p>
                <button onClick={() => navigate("/")} className="btn-seePros">Check out our pros</button>
            </section>
        }
        </div>
    </>
}