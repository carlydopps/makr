import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSelectedPro } from "../ApiManager"
import { Footer } from "../footer/Footer"
import { ProjectForm } from "../projects/ProjectForm"
import './ProProfile.css'

export const ProProfile = () => {

    const {proId} = useParams()
    const [pro, updatePro] = useState([])

    const localUser = localStorage.getItem("current_user")
    const currentUser = JSON.parse(localUser)
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
    <main className="main-profile">
        <section className="details-profile">
            <div className="profile-image_frame">
                <img src={pro.user?.profileImage} className="image-profileMain"/>
            </div>
            <div className="details-profile_info">
                <h2>{pro.user?.name}</h2>
                <div className="body-profile_info">
                    <p>{pro.expertiseType?.name}</p>
                    <p className="paragraph-center">{pro.price?.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})} / hr</p>
                    <p>{pro.experience} years of experience</p>
                </div>
                <div className="body-profile_about">
                    <p>{pro.aboutMe}</p>
                </div>
            </div>
                {
                    currentUser
                    ? <button onClick={() => navigate(`/project-form/${pro.id}`)}
                    className="btn-book" disabled={pro.userId === currentUser.id 
                        ? true 
                        : false}>Book a Session</button>
                    : <button onClick={() => navigate('/login')}>Login to book</button>
                }
        </section>
    </main>
    <Footer/>
    </>
}