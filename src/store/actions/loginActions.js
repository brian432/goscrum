import { loginFetch } from "../../services/loginFetch"

export const loginSucces = data => ({
    type: 'LOGIN_SUCCES',
    payload: data
})

export const loginFailure = error => ({
    type: 'LOGIN_FAILURE',
    payload: error
})

export const localStorageSaved = (userName, password) => dispatch => {
    loginFetch(userName, password)
        .then(data => {
            if (data.status_code === 200) {
                dispatch(loginSucces(data))
            } else {
                dispatch(loginFailure(""))
            }
        })
}

export const loginIncorrect = () => dispatch => {
    dispatch({
        type: "LOGIN_INCORRECT"
    })
}

export const logout = () => dispatch => {
    dispatch({
        type: "LOGOUT"
    })
}