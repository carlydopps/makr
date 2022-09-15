import { Link } from "react-router-dom"

export const Project = ({project}) => {

    return <li className="project">
        <header className="project__header">
            <Link to={`/project/${project.id}/details`}/>
        </header>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
    </li>
}