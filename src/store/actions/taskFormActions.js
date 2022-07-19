const { REACT_APP_API_ENDPOINT } = process.env

export const createTaskSucces = () => ({
    type: 'CREATE_SUCCES'
})

export const createTaskFailure = () => ({
    type: 'CREATE_FAILURE'
})

export const switchTaskCreated = ()=>({
    type:'SWITCH_TASKCREATED'
})

export const postTask = values => dispatch => {
    fetch(`${REACT_APP_API_ENDPOINT}task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            task: values
        })
    })
        .then((response) => response.json())
        .then(data => {
            if (data.status_code === 200) {
                dispatch(createTaskSucces())
            }else{
                dispatch(createTaskFailure())
            }
        }

        )
}

