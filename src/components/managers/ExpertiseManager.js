export const getExpertiseTypes = () => {
    return fetch(`http://localhost:8088/expertiseTypes`)
        .then(res => res.json())
}
