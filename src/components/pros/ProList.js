// Generates a list of profile previews for all pros

export const ProList = ({pros}) => {
    return <>
        {
            pros.map(pro => {
                return <>
                    <section className="pro" key={`pro--${pro.id}`}>
                        <header>{pro.user.name}</header>
                        <ul>
                            <li>{pro.expertiseType.name}</li>
                            <li>{pro.experience} years of experience</li>
                            <li>{pro.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})}</li>
                        </ul>
                    </section>
                </>
            })
        }
    </>
}