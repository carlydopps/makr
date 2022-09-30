import { useEffect, useState } from "react"
import { Footer } from "../footer/Footer"
import { ProjectListMakr } from "./ProjectListMakr"
import { ProjectListPro } from "./ProjectListPro"
import "./ProjectList.css"

export const ProjectList = () => {

    const [projectType, setProjectType] = useState("pro")

    useEffect(
        () => {
            if (projectType === "makr") {
            document.querySelector(".sectionSwitch").classList.add('active');
            } else {
                document.querySelector(".sectionSwitch").classList.remove('active');
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
                    <h2 className="h2-project">Projects</h2>
                    <div className="section-switch_title">
                    {
                        currentUser.isPro
                        ? <div className="container">
                            <div className="input-switch">
                                <label htmlFor="switchy">Pro</label>
                                <input type="checkbox" id="switchy" className="input" onChange={() => {
                                    if (projectType === "pro") {
                                        setProjectType("makr")
                                    } else {
                                        setProjectType("pro")
                                    }}}/>
                                <label htmlFor="switchy" className="switch"></label>
                                <label htmlFor="switchy">Makr</label>
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
                        ? <h2 className="h2-project_listMakr">Makr Projects</h2>
                        : <h2 className="h2-project_listPro">Pro Projects</h2>
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