import './Header.css'
import { useNavigate } from 'react-router-dom';
export const Header = () => {
    const navigate = useNavigate()

    const HandleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        navigate("/Login", { replace: true })
    }
    return (
        <header>
            <span>Go Scrum</span>
            <div className='wrapper_rigth_header'>
                <div>{localStorage.getItem("userName")}</div> {/*Cuando iniciamos sesion en el componente login, creamos un item en localStorage de la siguiente maner localStorage.setItem("userName", variableQueAlmacenaUserName)*/}
                <div onClick={HandleLogout}>X</div>
            </div>
        </header>
    )
}