// User can view the home page with previews of professionals' profiles (imported component)
// User who is not logged in can view the logged out nav bar
// User who is logged in can view the logged in nav bar

import { ProList } from "../pros/ProList"

export const Makr = () => {
    
    return (
        <>
            <header></header>
            <section className="home__header">
                <h1>Makr</h1>
                <h3>Summary</h3>
            </section>
            <section>
                <h4>Professionals</h4>
                <ProList/>
            </section>
            <footer></footer>
        </>
        
    )
}