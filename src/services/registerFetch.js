const { REACT_APP_API_ENDPOINT } = process.env

export const postRegisterFetch = async (values, teamID) => {
    try {
        const response = await fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
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
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }

}