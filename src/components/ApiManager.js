// Define and export functions for all fetch calls

// ----------------------------- User Data -------------------------------------

export const getUsersData = () => {
    return fetch(`http://localhost:8088/users`)
    .then(res => res.json())
}

// ----------------------------- Expertise Data -------------------------------------

export const getExpertiseData = () => {
    return fetch(`http://localhost:8088/expertiseTypes`)
    .then(res => res.json())
}

// ----------------------------- Pro Data -------------------------------------

export const getProsData = () => {
    return fetch(`http://localhost:8088/pros?_expand=expertiseType&_expand=user`)
    .then(res => res.json())
}

// ----------------------------- User Data -------------------------------------


// ----------------------------- User Data -------------------------------------


