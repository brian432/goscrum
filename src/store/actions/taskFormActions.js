import { taskFormFetch } from "../../services/taskFormFetch"

export const createTaskSucces = () => ({
    type: 'CREATE_SUCCES'
})

export const createTaskFailure = () => ({
    type: 'CREATE_FAILURE'
})

export const switchTaskCreated = () => ({
    type: 'SWITCH_TASKCREATED'
})

export const postTask = values => dispatch => {
    taskFormFetch(values)
        .then(data => {
            if (data.status_code === 200) {
                dispatch(createTaskSucces())
            } else {
                dispatch(createTaskFailure())
            }
        })
}

