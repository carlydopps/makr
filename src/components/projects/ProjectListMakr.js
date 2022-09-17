import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteProject, getMakrProjects } from "../ApiManager"

export const ProjectListMakr = ({userId}) => {
    
    const [projects, setProjects] = useState([])

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

        }} className="project__delete">Delete</button>
    }

    return <>
        <h2>Your Makr Project List</h2>
        {
            projects.map(
                (project) => <li className="project" key={project.id}>
                    <header className="project__header">
                        <Link to={`/project/${project.id}/details`}>{project.title}</Link>
                    </header>
                        {deleteButton(project.id)}
                </li>
            )
        }
    </>
}