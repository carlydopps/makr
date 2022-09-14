// User can view the home page with previews of professionals' profiles
// User who is not logged in can view the logged out nav bar
// User who is logged in can view the logged in nav bar

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProsData } from "../ApiManager"
import { ProList } from "../pros/ProList"

export const Makr = () => {

    const [pros, setPros] = useState([])
    
    const navigate = useNavigate()

    useEffect(
        () => {
            getProsData()
            .then(proArray => setPros(proArray))
        },
        []
    )

    return (
        <>
            <header></header>
            <section className="home__header">
                <h1>Makr</h1>
                <h3>Summary</h3>
            </section>
            <section>
                <h4>Professionals</h4>
                <ProList pros={pros}/>
            </section>
            <footer></footer>
        </>
        
    )
}