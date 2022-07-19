const initialValues = {
    login: null
}

export const loginReducer = (state = initialValues, action) => {
    switch (action.type) {
        case "LOGIN_SUCCES":
            localStorage.setItem("token", action.payload.result.token)
            localStorage.setItem("userName", action.payload.result.user.userName)
            localStorage.setItem("teamID", action.payload.result.user.teamID)
            return {
                login: true,
                teamID: action.payload.result.user.teamID
            }
        case "LOGIN_FAILURE":
            return {
                login: false
            }
        case "LOGIN_INCORRECT":
            return {
                login: null
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            localStorage.removeItem("userName")
            localStorage.removeItem("teamID")
            return {
                login: null
            }
        default:
            return state
    }
}