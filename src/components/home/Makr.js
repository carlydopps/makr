// User can view the home page with previews of professionals' profiles (imported component)
// User who is not logged in can view the logged out nav bar
// User who is logged in can view the logged in nav bar

import { ProList } from "../pros/ProList"
import './Makr.css'

export const Makr = () => {
    
    return (
        <main>
            <header className="home-header">
                <p>Welcome to Makr </p>
                <p className="home-summary">a platform that helps the makers, the creators, and the DIYers accomplish more with personalized expert guidance</p>
            </header>
            <section className="pro-summary">
                <h4>Meet the Pros</h4>
                <ProList/>
            </section>
            <footer className="footer-home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1663639606/Screen_Shot_2022-09-19_at_9.05.23_PM-removebg-preview_cvnxt3.png' alt="Home" className="footer-image"></img>
            </footer>
        </main>
        
    )
}