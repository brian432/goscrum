const initialValues = {
    data: [],
    register: null,
    teamID: ""
}

export const registerReducer = (state = initialValues, action) => {
    switch (action.type) {
        case "DATA_SUCCESS":
            return {
                ...state,
                data: action.payload
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                register: true,
                teamID: action.payload
            }
        case "REGISTER_FAILURE":
            return {
                ...state,
                register: false
            }
        case "REGISTER_NULL":
            return {
                ...state,
                register: null
            }
        default:
            return state
    }
}