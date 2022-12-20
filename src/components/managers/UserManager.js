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