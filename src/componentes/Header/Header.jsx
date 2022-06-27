import './Header.css'
import { useNavigate } from 'react-router-dom';
export const Header=()=>{
    const navigate=useNavigate()

    const HandleLogout=()=>{
        localStorage.removeItem("logged");
        navigate("/Login", {replace:true})
    }
    return (
        <header>
            <span>Go Scrum</span>
            <div onClick={HandleLogout}>X</div>
        </header>
    )
}