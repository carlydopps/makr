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
        }} className="project__delete">Delete</button>
    }

    return <>
        <h2>Makr Project List</h2>
        {
            projects.length > 0
            ? projects.map(
                (project) => <li className="project" key={project.id}>
                    <header className="project__header">
                        <Link to={`/project/${project.id}/details`}>{project.title}</Link>
                    </header>
                        {deleteButton(project.id)}
                </li>
            )
            :<>
                <p>Start creating! 🏡</p>
                <button onClick={() => navigate("/")}>Check out our pros</button>
            </>
        }
    </>
}