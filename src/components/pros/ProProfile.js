import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSelectedPro } from "../ApiManager"
import { ProjectForm } from "../projects/ProjectForm"

export const ProProfile = () => {

    const {proId} = useParams()
    const [pro, updatePro] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            getSelectedPro(proId)
                .then((data) => {
                    const selectedPro = data[0]
                    updatePro(selectedPro)
                })
        },
        [proId]
    )

    const handleBookSession = () => {
        <ProjectForm pro={pro}/>
        navigate("/project-form")
    }

    return <>
        <header></header>
        <section>
            <h2>{pro.user?.name}</h2>
            <button onClick={() => navigate(`/project-form/${pro.id}`)}
                className="btn__book">Book a Session</button>
        </section>
        <section>
            <div>
                <p>{pro.expertiseType?.name}</p>
                <p>{pro.price?.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})} / hr</p>
                <p>{pro.aboutMe}</p>
                <p>{pro.experience} years of experience</p>
            </div>
        </section>
        <footer></footer>
    </>
}