// Define and export functions for all fetch calls

// ----------------------------- User Data -------------------------------------

export const getUsersData = () => {
    return fetch(`http://localhost:8088/users`)
    .then(res => res.json())
}

export const getCurrentUser = (userId) => {
    return fetch(`http://localhost:8088/users?id=${userId}`)
    .then(res => res.json())
}

export const getAssignedMakr = (userId) => {
    return fetch(`http://localhost:8088/users?id=${userId}`)
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

export const getAssignedPro = (proId) => {
    return fetch(`http://localhost:8088/pros?_expand=user&id=${proId}`)
    .then(res => res.json())
}

// ----------------------------- Project Data -------------------------------------
export const getSelectedProject = (projectId) => {
    return fetch(`http://localhost:8088/projects?id=${projectId}`)
    .then(res => res.json())
}

export const getMakrProjects = (userId) => {
    return fetch(`http://localhost:8088/projects?userId=${userId}`)
    .then(res => res.json())
}

export const getProProjects = (userId) => {
    return fetch(`http://localhost:8088/projects?proId=${userId}`)
    .then(res => res.json())
}

export const postProject = (project) => {
    return fetch(`http://localhost:8088/projects`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
}

export const deleteProject = (projectId) => {
    return fetch(`http://localhost:8088/projects/${projectId}`, {
        method: "DELETE"
    })
}

