export const getImages = (proId) => {
    return fetch(`http://localhost:8088/images?proId=${proId}`)
        .then(res => res.json())
}