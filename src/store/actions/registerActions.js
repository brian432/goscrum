const { REACT_APP_API_ENDPOINT } = process.env

export const dataSuccess = data => ({
    type: "DATA_SUCCESS",
    payload: data
})

export const registerSuccess = data => ({
    type: "REGISTER_SUCCESS",
    payload: data
})

export const registerFailure = () => ({
    type: "REGISTER_FAILURE"
})

export const switchRegister = () => ({
    type: "REGISTER_NULL"
})

export const getDataSelect = () => dispatch => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
        .then(response => response.json())
        .then(data => dispatch(dataSuccess(data.result)))
}

export const postRegister = (values, teamID) => dispatch => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/register`, { //Recordar que al probar la api, siempre cambiar el nombre de usuario y el email porque sino el post request tirara un error
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                userName: values.userName,
                password: values.password,
                email: values.email,
                teamID,
                role: values.role,
                continent: values.continent,
                region: values.region,
            },
        }),
    })
        .then((response) => response.json())
        .then(data => {
            if (data.status_code === 201) {
                dispatch(registerSuccess(data.result.user.teamID))
            } else {
                dispatch(registerFailure())
            }
        })
}

