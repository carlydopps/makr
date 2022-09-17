import { ProjectListMakr } from "./ProjectListMakr"
import { ProjectListPro } from "./ProjectListPro"

export const ProjectList = () => {

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)

    return <>
        <h3>My Projects</h3>
            <section>
                <div>
                    <ul>
                    {
                        currentUser.isPro
                        ? <ProjectListPro userId={currentUser.id}/>
                        : <ProjectListMakr userId={currentUser.id}/>
                    }
                    </ul>
                </div>
            </section>
    </>
}