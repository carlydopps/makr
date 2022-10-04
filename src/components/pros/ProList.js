// Generates a list of profile previews for all pros

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProsData } from "../ApiManager"
import "./ProList.css"

export const ProList = ({searchTermState}) => {

    const [pros, setPros] = useState([])
    const [filteredPros, setFilteredPros] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getProsData()
                .then(proArray => setPros(proArray))
        },
        []
    )

    useEffect(
        () => {
            setFilteredPros(pros)
        },
        [pros]
    )

    useEffect(
        () => {
            const searchedPros = pros.filter(pro => {
                return pro.expertiseType.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredPros(searchedPros)
        },
        [searchTermState]
    )

    return <section className="list__pros">
        {
            filteredPros.map(pro => {
                return <div key={`pro--${pro.id}`}>
                    <button onClick={() => navigate(`/profile/${pro.id}`)} className="button__pro">
                        <img src={pro.user.profileImage} alt="Profile Image" className="profileImage-pro"/>
                        <div className="pro-card_details">
                            <h4 className="h4-proName">{pro.user.name}</h4>
                            <ul className="list-proPreview">
                                <li className="pro-expertise">{pro.expertiseType.name}</li>
                                <li>{pro.experience} years of experience</li>
                                <li>{pro.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})}</li>
                            </ul>
                        </div>
                    </button>
                </div>
            })
        }
    </section>
}