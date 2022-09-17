import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProjects } from "../ApiManager"

export const ProjectListPro = ({userId}) => {
    
    const [projects, setProjects] = useState([])
    // const [filteredProjects, setFilteredProjects] = useState([])

    useEffect(
        () => {                
            getProjects()
            .then(projects => setProjects(projects))
        },
        []
    )

    // useEffect(
    //     () => {
    //         const proProjects = projects.filter(project => project.pro.userId === user.id)
    //         setFilteredProjects(proProjects)
    //     },
    //     [user]
    // )

    // return <>
    //     {
    //         projects.map(
    //             (project) => <li className="project" key={"makrProject--${project.id}"}>
    //                 <header className="project__header">
    //                     <Link to={`/project/${project.id}/details`}>{project.title}</Link>
    //                 </header>
    //             </li>
    //         )
    //     }
    // </>
    return <h1>Your Pro Project List</h1>
}
