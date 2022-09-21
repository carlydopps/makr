import { useState } from "react"
import { Footer } from "../footer/Footer"
import { ProjectListMakr } from "./ProjectListMakr"
import { ProjectListPro } from "./ProjectListPro"

export const ProjectList = () => {

    const [projectType, setProjectType] = useState("pro")

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    return <>
        <h2>My Projects</h2>
        <section>
            <div>
                <ul>
                {
                    currentUser.isPro
                    ? <ProjectListPro userId={currentUser.id} projectType={projectType}/>
                    : <ProjectListMakr userId={currentUser.id}/>
                }
                </ul>
            </div>
        </section>
        {
            currentUser.isPro
            ? <aside className="menu-listType">
                <button onClick={() => setProjectType("pro")}>Pro Projects</button>
                <button onClick={() => setProjectType("makr")}>Makr Projects</button>
            </aside>
            : ""
        }
        <Footer/>
    </>
}