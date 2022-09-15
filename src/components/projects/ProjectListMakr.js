import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteProject, getMakrProjects } from "../ApiManager"

export const ProjectListMakr = ({user}) => {
    
    const [projects, setProjects] = useState([])

    useEffect(
        () => {                
            getMakrProjects(user.id)
                .then(projects => setProjects(projects))
            }
    )

    const deleteButton = (projectId) => {
        return <button onClick={() => {
            deleteProject(projectId)
                .then(getMakrProjects)

        }} className="project__delete">Delete</button>
    }

    return <>
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