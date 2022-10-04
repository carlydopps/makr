// User can view the home page with previews of professionals' profiles (imported component)
// User who is not logged in can view the logged out nav bar
// User who is logged in can view the logged in nav bar

import { ProContainer } from "../pros/ProContainer"
import './Makr.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ImageCarousel } from "../ImageCarousel";

export const Makr = () => {
    
    return (
        <main className="main-home">
            <section className="carousel">
                <ImageCarousel/>
            </section>
            <section className="pro-summary">
                <h2 className="h2-home">Meet the Pros</h2>
                <ProContainer/>
            </section>
            <footer className="footer-home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1664854224/image_mmqlth.png' alt="Home" className="footer-image"></img>
            </footer>
        </main>
        
    )
}