import { useEffect, useState } from "react"
import { Footer } from "../footer/Footer"
import { ProjectListMakr } from "./ProjectListMakr"
import { ProjectListPro } from "./ProjectListPro"
import "./ProjectList.css"

export const ProjectList = () => {

    const [projectType, setProjectType] = useState("makr")

    useEffect(
        () => {
            window.scrollTo(0, 0)
        },
        []
    )

    useEffect(
        () => {
            if (projectType === "makr") {
            document.querySelector(".sectionSwitch").classList.remove('active');
            } else {
                document.querySelector(".sectionSwitch").classList.add('active');
            }
        },
        [projectType]
    )

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    return <>
        <main className="main-projects">
            <div className="sectionSwitch">
                <div className="projects-header">
                    <h2 className="h2-project">P R O J E C T S</h2>
                    <div className="section-switch_title">
                    {
                        currentUser.isPro
                        ? <div className="container">
                            <div className="input-switch">
                                <label htmlFor="switchy">Makr</label>
                                <input type="checkbox" id="switchy" className="input" onChange={() => {
                                    if (projectType === "pro") {
                                        setProjectType("makr")
                                    } else {
                                        setProjectType("pro")
                                    }}}/>
                                <label htmlFor="switchy" className="switch"></label>
                                <label htmlFor="switchy">Pro</label>
                            </div>
                        </div>
                        // <aside className="menu-listType">
                        //     <button onClick={() => setProjectType("pro")} className="button-listType">Pro Projects</button>
                        //     <button onClick={() => setProjectType("makr")} className="button-listType">Makr Projects</button>
                        // </aside>
                        : ""
                    }
                    { 
                        projectType === "makr"
                        ? <h2 className="h2-project_listMakr">MAKR PROJECTS</h2>
                        : <h2 className="h2-project_listPro">PRO PROJECTS</h2>
                    }  
                    </div>
                    </div>
                <div className="body-projects">
                    <section className="projects-list">
                        {
                            currentUser.isPro
                            ? <ProjectListPro userId={currentUser.id} projectType={projectType}/>
                            : <ProjectListMakr userId={currentUser.id}/>
                        }
                    </section>
                </div>
            </div>
            </main>
        <Footer/>
    </>
}