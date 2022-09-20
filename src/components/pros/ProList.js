// Generates a list of profile previews for all pros

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProsData } from "../ApiManager"
import "./ProList.css"

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

    return <section className="list__pros">
        {
            pros.map(pro => {
                return <div key={`pro--${pro.id}`}>
                    <button onClick={() => navigate(`/profile/${pro.id}`)} className="button__pro">
                        <img src={pro.user.profileImage} alt="Profile Image" className="profileImage-pro"/>
                        <h4>{pro.user.name}</h4>
                        <ul>
                            <li>{pro.expertiseType.name}</li>
                            <li>{pro.experience} years of experience</li>
                            <li>{pro.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})}</li>
                        </ul>
                    </button>
                </div>
            })
        }
    </section>
}