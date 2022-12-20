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