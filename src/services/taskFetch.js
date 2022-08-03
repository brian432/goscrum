const { REACT_APP_API_ENDPOINT } = process.env

export const taskGetFetch = async (path) => {
    const response = await fetch(`${REACT_APP_API_ENDPOINT}task${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    const result = await response.json()
    return result
}

export const deleteTaskFetch = async (id) => {
    const response = await fetch(`${REACT_APP_API_ENDPOINT}task/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    const result = await response.json()
    return result
}

export const editTaskFetch = async (data, change) => {
    const statusArray = ["NEW", "IN PROGRESS", "FINISHED"]
    const importanceArray = ["LOW", "MEDIUM", "HIGH"]

    const newStatusIndex =
        statusArray.indexOf(data.status) > 1
            ? 0
            : statusArray.indexOf(data.status) + 1

    const newImportanceIndex =
        importanceArray.indexOf(data.importance) > 1
            ? 0
            : importanceArray.indexOf(data.importance) + 1

    const response = await fetch(`${REACT_APP_API_ENDPOINT}task/${data._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            task: {
                title: data.title,
                importance: change === "importance" ? importanceArray[newImportanceIndex] : data.importance,
                status: change === "status" ? statusArray[newStatusIndex] : data.status,
                description: data.description,
            },
        })
    })
    const result = await response.json()
    return result
}