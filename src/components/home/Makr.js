// User can view the home page with previews of professionals' profiles (imported component)
// User who is not logged in can view the logged out nav bar
// User who is logged in can view the logged in nav bar

import { ProList } from "../pros/ProList"
import './Makr.css'

export const Makr = () => {
    
    return (
        <>
            <header></header>
            <section className="home-header">
                <p>Welcome to Makr </p>
                <p className="home-summary">a platform that helps the makers, the creators, and the DIYers accomplish more with personalized expert guidance</p>
            </section>
            <section className="pro-summary">
                <h4>Meet the Pros</h4>
                <ProList/>
            </section>
            <footer>
                
            </footer>
        </>
        
    )
}