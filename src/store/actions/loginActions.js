const { REACT_APP_API_ENDPOINT } = process.env

export const loginSucces = data => ({
    type: 'LOGIN_SUCCES',
    payload: data
})

export const loginFailure = error => ({
    type: 'LOGIN_FAILURE',
    payload: error
})

export const localStorageSaved = (userName, password) => dispatch => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: userName,
            password: password
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status_code === 200) {
                dispatch(loginSucces(data))
            } else {
                dispatch(loginFailure(""))
            }
        })
}

export const loginFailed = () => dispatch => {
    dispatch({
        type: "LOGIN_FAILED"
    })
}
