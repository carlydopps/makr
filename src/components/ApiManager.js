// Define and export functions for all fetch calls

// ----------------------------- User Data -------------------------------------

export const getUsersData = () => {
    return fetch(`http://localhost:8088/users`)
    .then(res => res.json())
}

export const getCurrentUser = (currentUserId) => {
    return fetch(`http://localhost:8088/users?userId=${currentUserId}`)
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

export const getSelectedPro = (proId) => {
    return fetch(`http://localhost:8088/pros?_expand=expertiseType&_expand=user&id=${proId}`)
    .then(res => res.json())
}

// ----------------------------- Request Data -------------------------------------

export const postRequest = (request) => {
    return fetch(`http://localhost:8088/requests`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
}

