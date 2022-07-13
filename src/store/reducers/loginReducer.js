const initialValues = {
    login: null
}

export const loginReducer = (state = initialValues, action) => {
    if (action.type === "LOGIN_SUCCES") {
            localStorage.setItem("token", action.payload.result.token)
            localStorage.setItem("userName", action.payload.result.user.userName)
            return {
                login:true
            }
    }
    if (action.type === "LOGIN_FAILURE") {
        return {
            login:false
        }
    }
    if(action.type === "LOGIN_FAILED"){
        return {
            login:null
        }
    }
    return state
}