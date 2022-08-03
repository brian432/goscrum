const { REACT_APP_API_ENDPOINT } = process.env

export const taskFormFetch = async (values) => {
    try {
        const response = await fetch(`${REACT_APP_API_ENDPOINT}task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                task: values
            })
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}