import { postRegisterFetch } from "../../services/registerFetch"

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
        .then(data => {
            dispatch(dataSuccess(data.result))
        })
}

export const postRegister = (values, teamID) => dispatch => {
    postRegisterFetch(values, teamID)
        .then(data => {
            if (data.status_code === 201) {
                dispatch(registerSuccess(data.result.user.teamID))
            } else {
                dispatch(registerFailure())
            }
        })
}

