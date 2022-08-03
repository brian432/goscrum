import { Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" replace={true} />
    }
    return children
}