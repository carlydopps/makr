import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProProjects } from "../ApiManager"

export const ProjectListPro = ({user}) => {
    
    const [projects, setProjects] = useState([])

    useEffect(
        () => {                
            getProProjects(user.id)
                .then(projects => setProjects(projects))
            }
    )

    return <>
        {
            projects.map(
                (project) => <li className="project" key={project.id}>
                    <header className="project__header">
                        <Link to={`/project/${project.id}/details`}>{project.title}</Link>
                    </header>
                </li>
            )
        }
    </>
}
