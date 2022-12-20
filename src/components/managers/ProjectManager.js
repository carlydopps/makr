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