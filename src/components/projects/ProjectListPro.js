import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProjects } from "../ApiManager"
import { ProjectListMakr } from "./ProjectListMakr"

export const ProjectListPro = ({userId, projectType}) => {
    
    const [projects, setProjects] = useState([])

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

    return <>
        { projectType === "pro"
            ? <>
                <h2 className="h2-project_list">Pro Project List</h2>
                {projects.length > 0
                    ? <section className="list-projectsDisplay">
                    {
                        projects.map(
                            (project) => 
                            {return <div className="project" key={"makrProject--${project.id}"}>
                                <div className="project-header">
                                    <img src={project.image} className="image-projectPreview"/>
                                </div>
                                <div className="body-projectPreview">
                                    <p className="project-details_title">{project.title}</p>
                                    <button onClick={() => navigate(`/project/${project.id}/details`)} className="btn-project_view">View Details</button>
                                </div>
                            </div>}
                    )}
                    </section>
                    : <p className="message-project">You have the day off! Your project list is currently empty.</p>
                }
            </>
            : <ProjectListMakr userId={userId}/>
        }
    </>
}
