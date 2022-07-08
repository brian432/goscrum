const { REACT_APP_API_ENDPOINT } = process.env

export const tasksRequest = () =>({
    type: "TASKS_REQUEST"
})

export const getTasks = (path) => dispatch => {
    dispatch(tasksRequest())
    fetch(`${REACT_APP_API_ENDPOINT}/task${path}`, {
        headers: { 
            'Content-type': 'applicaction/json', 
            Autorization: "Bearer " + localStorage.getItem("token")
        }
    }).then(response=>response.json())
    .then(data=>{})
    .catch(error=>{})
}