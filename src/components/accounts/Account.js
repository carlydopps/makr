// User can view contact information
// User can edit contact information
// User can view current projects
// Makr user can delete a project
// User can click the logo and route to the home page
// User can view the logged in nav bar

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentUser } from "../ApiManager"
import { ProjectListMakr } from "../projects/ProjectListMakr"
import { ProjectListPro } from "../projects/ProjectListPro"

export const Account = () => {

    const {userId} = useParams()
    const [user, setUser] = useState([])

    useEffect(
        () => {
            getCurrentUser(userId)
                .then(data => {
                    const singleUser = data[0]
                    setUser(singleUser)})
        },
        [userId]
    )

    const firstName = user?.name?.split(" ")[0]

    return (
        <>
            <h1>Hello, {firstName}</h1>
            <section>
                <h3>Contact Information</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
            </section>
            <section>
                <h3>My Projects</h3>
                    <article>
                        <ul>
                        {
                            user.isPro
                            ? <ProjectListPro user={user}/>
                            : <ProjectListMakr user={user}/>
                        }
                        </ul>
                    </article>
            </section>
        </>
    )
}