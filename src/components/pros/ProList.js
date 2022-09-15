// Generates a list of profile previews for all pros

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProsData } from "../ApiManager"

export const ProList = () => {

    const [pros, setPros] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getProsData()
            .then(proArray => setPros(proArray))
        },
        []
    )

    return <>
        {
            pros.map(pro => {
                return <div key={`pro--${pro.id}`}>
                    <button onClick={() => navigate(`/profile/${pro.id}`)} className="button__pro">
                        <header>{pro.user.name}</header>
                        <ul>
                            <li>{pro.expertiseType.name}</li>
                            <li>{pro.experience} years of experience</li>
                            <li>{pro.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})}</li>
                        </ul>
                    </button>
                </div>
            })
        }
    </>
}