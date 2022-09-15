import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSelectedPro } from "../ApiManager"
import { RequestForm } from "../projects/RequestForm"

export const ProProfile = () => {

    const {proId} = useParams()
    const [pro, updatePro] = useState({})

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
        <RequestForm pro={pro}/>
        navigate("/request-form")
    }

    return <>
        <header></header>
        <section>
            <h2>{pro.user?.name}</h2>
            <Link to="/request-form" onClick=
                {() => {<RequestForm pro={pro}/>}}
                className="btn__book">Book a Session</Link>
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