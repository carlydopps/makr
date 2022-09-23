import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteProject, getMakrProjects } from "../ApiManager"

export const ProjectListMakr = ({userId}) => {
    
    const [projects, setProjects] = useState([])

    const navigate = useNavigate()

    const renderProjects = () => {
        getMakrProjects(userId)
                .then(projects => setProjects(projects))
    }
    useEffect(
        () => {                
            renderProjects()
        }, 
        []
    )

    const deleteButton = (projectId) => {
        return <button onClick={() => {
            deleteProject(projectId)
                .then(renderProjects)
        }} className="btn-project_delete">Delete</button>
    }

    const formatDate = (project) => {
        let formattedDate = project.date.split("T")
        formattedDate = formattedDate[0]
        formattedDate = formattedDate.split("-")
        formattedDate = [formattedDate[1], formattedDate[2], formattedDate[0]]
        return formattedDate.join("/")    
    }

    return <>
        <h2 className="h2-project_list">Makr Project List</h2>
        {
            projects.length > 0
            ? <section className="list-projectsDisplay">
            {
                projects.map(
                    (project) => <div className="project" key={project.id}>
                        <div className="project-header">
                            <img src={project.image} className="image-projectPreview" alt="Project Image"/>
                        </div>
                        <div className="body-projectPreview">
                            <Link to={`/project/${project.id}/details`} className="project-details_title">{project.title}</Link>
                            <p className="project-details_date">{formatDate(project)}</p>
                            {deleteButton(project.id)}
                        </div>
                    </div>
            )}
            </section>
            :<>
                <p className="message-project">Start creating! 🏡</p>
                <button onClick={() => navigate("/")} className="btn-seePros">Check out our pros</button>
            </>
        }
    </>
}