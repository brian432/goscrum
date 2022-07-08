const initialState = {
    loading: false,
    tasks: [],
    error: []
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TASKS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'TASKS_SUCCESS':
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error:[]
            }
        case 'TASKS_FAILURE':
            return {
                loading: false,
                error:action.payload,
                tasks:[]
            }


        default:
            return state
    }
}