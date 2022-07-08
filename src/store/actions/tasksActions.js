const { REACT_APP_API_ENDPOINT } = process.env

export const tasksRequest = () => ({
    type: "TASKS_REQUEST"
})
export const tasksSucces = (data) => ({
    type: "TASKS_SUCCESS",
    payload: data
})
export const tasksFailure = (error) => ({
    type: "TASKS_FAILURE",
    payload: error
})

export const getTasks = (path) => dispatch => {  
    dispatch(tasksRequest())
    fetch(`${REACT_APP_API_ENDPOINT}/task${path}`, {
        headers: {
            'Content-type': 'applicaction/json',
            Autorization: "Bearer " + localStorage.getItem("token")
        }
    }).then(response => response.json())
        .then(data => { dispatch(tasksSucces(data.result)) })
        .catch(error => { dispatch(tasksFailure(error)) })
}