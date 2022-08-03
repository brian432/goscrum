import { deleteTaskFetch, editTaskFetch, taskGetFetch } from "../../services/taskFetch"

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
    taskGetFetch(path)
        .then(data => {
            dispatch(tasksSuccess(data.result))
        })
        .catch(error => { dispatch(tasksFailure(error)) })

}

export const deleteTasks = (id, tasksFromWho) => dispatch => {
    dispatch(tasksRequest())
    deleteTaskFetch(id)
        .then(() => dispatch(getTasks(tasksFromWho === "ME" ? "/me" : "")))
        .catch(error => { dispatch(tasksFailure(error)) })
}

export const editTaskStatusOrImportance = (data, change, tasksFromWho) => dispatch => {
    editTaskFetch(data, change)
        .then(() => dispatch(getTasks(tasksFromWho === "ME" ? "/me" : "")))
        .catch(error => dispatch(tasksFailure(error)))
}
