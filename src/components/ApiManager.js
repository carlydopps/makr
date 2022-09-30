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

export const checkEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

export const saveEditedUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const postUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

// ----------------------------- Expertise Data -------------------------------------

export const getExpertiseTypes = () => {
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

export const getCurrentPro = (userId) => {
    return fetch(`http://localhost:8088/pros?_expand=expertiseType&_expand=user&userId=${userId}`)
        .then(res => res.json())
}

export const postPro = (pro) => {
    return fetch("http://localhost:8088/pros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pro)
    })
        .then(res => res.json())
}

export const saveEditedPro = (pro) => {
    return fetch(`http://localhost:8088/pros/${pro.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pro)
    })
        .then(res => res.json())
}

// ----------------------------- Project Data -------------------------------------

export const getSelectedProject = (projectId) => {
    return fetch(`http://localhost:8088/projects?id=${projectId}`)
        .then(res => res.json())
}

export const getMakrProjects = (userId) => {
    return fetch(`http://localhost:8088/projects?_sort=date&userId=${userId}`)
        .then(res => res.json())
}

export const getProjects = () => {
    return fetch(`http://localhost:8088/projects?_sort=date&_expand=pro`)
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

export const saveProject = (project) => {
    return fetch(`http://localhost:8088/projects/${project.id}`, {
        method: "PUT",
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

// ----------------------------- Image Data -------------------------------------
export const getImages = (proId) => {
    return fetch(`http://localhost:8088/images?proId=${proId}`)
        .then(res => res.json())
}