const { REACT_APP_API_ENDPOINT } = process.env

export const tasksRequest = () => ({
    type: "TASKS_REQUEST"
})
export const tasksSuccess = data => ({
    type: "TASKS_SUCCESS",
    payload: data
})
export const tasksFailure = error => ({
    type: "TASKS_FAILURE",
    payload: error
})



export const getTasks = path => dispatch => {
    dispatch(tasksRequest())
    fetch(`${REACT_APP_API_ENDPOINT}task${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }).then(response => response.json())
        .then(data => { 
            console.log(data);
            dispatch(tasksSuccess(data.result)) })
        .catch(error => { dispatch(tasksFailure(error)) })
    
}



export const deleteTasks = id => dispatch => { //cada card creada con el formulario, tiene una id, si le pasamos esa id a una peticion con el metodo "DELETE" esta eliminara ese objeto json de la base de dato.
    dispatch(tasksRequest())
    fetch(`${REACT_APP_API_ENDPOINT}task/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }).then(response => response.json())
        .then(() => dispatch(getTasks(""))) //Una vez realizada la eliminacion de la card, then llama a la accion getTasks que devolver todas las card menos la eliminada
        .catch(error => { dispatch(tasksFailure(error)) })
}



export const editTaskStatusOrImportance = (data, change) => dispatch => {
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

    fetch(`${REACT_APP_API_ENDPOINT}task/${data._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            task: {
                title: data.title,
                importance: change === "importance" ? importanceArray[newImportanceIndex]: data.importance,
                status: change === "status" ? statusArray[newStatusIndex]: data.status,
                description: data.description,
            },
        })
    })
        .then(response => response.json())
        .then(data => dispatch(getTasks("")))
        .catch(error => dispatch(tasksFailure(error)))
}
