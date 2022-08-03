const { REACT_APP_API_ENDPOINT } = process.env

export const loginFetch = async (userName, password) => {
    try {
        const response = await fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            }),
        })
        const result = await response.json();
        return result
    }catch (error){
        console.log(error);
    }
}