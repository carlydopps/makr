import { useState } from "react"
import { Footer } from "../footer/Footer"
import { ProjectListMakr } from "./ProjectListMakr"
import { ProjectListPro } from "./ProjectListPro"
import "./ProjectList.css"

export const ProjectList = () => {

    const [projectType, setProjectType] = useState("pro")

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    return <>
        <main className="main-projects">
            
            <h2 className="h2-project">Projects</h2>
            <div className="body-projects">
            {
                currentUser.isPro
                ? <aside className="menu-listType">
                    <button onClick={() => setProjectType("pro")} className="button-listType">Pro Projects</button>
                    <button onClick={() => setProjectType("makr")} className="button-listType">Makr Projects</button>
                </aside>
                : ""
            }
                <section className="projects-list">
                    {
                        currentUser.isPro
                        ? <ProjectListPro userId={currentUser.id} projectType={projectType}/>
                        : <ProjectListMakr userId={currentUser.id}/>
                    }
                </section>
            </div>
            </main>
        <Footer/>
    </>
}