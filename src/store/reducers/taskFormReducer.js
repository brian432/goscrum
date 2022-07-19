const initialValues = {
    taskCreated: null
}

export const taskFormReducer = (state = initialValues, action) => {
    switch (action.type) {
        case "CREATE_SUCCES":
            return {
                taskCreated: true
            }
        case "CREATE_FAILURE":
            return {
                taskCreated: false
            }
        case "SWITCH_TASKCREATED":
            return {
                taskCreated: null
            }
        default:
            return state
    }
}