import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProjects } from "../ApiManager"
import { ProjectListMakr } from "./ProjectListMakr"

export const ProjectListPro = ({userId, projectType}) => {
    
    const [projects, setProjects] = useState([])

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
                <h2>Pro Project List</h2>
                {projects.length > 0
                    ? projects.map(
                        (project) => 
                        {return <li className="project" key={"makrProject--${project.id}"}>
                            <header className="project__header">
                                <Link to={`/project/${project.id}/details`}>{project.title}</Link>
                            </header>
                        </li>}
                    )
                    : <p>You have the day off! Your project list is currently empty</p>
                }
            </>
            : <ProjectListMakr userId={userId}/>
        }
    </>
}
