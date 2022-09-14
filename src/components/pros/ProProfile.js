import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSelectedPro } from "../ApiManager"

export const ProProfile = () => {

    const {proId} = useParams()
    const [pro, updatePro] = useState({
        aboutMe: "",
        expertiseType: "",
        price: 0,
        experience: 0
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            getSelectedPro(proId)
                .then((data) => {
                    const singlePro = data[0]
                    updatePro(singlePro)
                })
        },
        [proId]
    )

    return <>
        <header></header>
        <section>
            <h2>{pro.user?.name}</h2>
            <button onClick={() => navigate(`/request-form/${pro.id}`)}className="btn__book">Book a Session</button>
        </section>
        <section>
            <div>
                <p>{pro.expertiseType.name}</p>
                <p>{pro.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})} / hr</p>
                <p>{pro.aboutMe}</p>
                <p>{pro.experience} years of experience</p>
            </div>
        </section>
        <footer></footer>
    </>
}