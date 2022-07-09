import './Header.css'
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux"

export const Header = () => {
    const navigate = useNavigate()
    const { tasks } = useSelector(state => { // traemos el estado del store mediante useSelector() y desestructutamos el estado con sus propiedades
        return state.tasksReducer
    })

    const HandleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        navigate("/Login", { replace: true })
    }
    return (
        <header>
            <span>Go Scrum</span>
            <div className='wrapper_rigth_header'>
                <div>Tareas creadas: {tasks?.length}</div>
                <div>{localStorage.getItem("userName")}</div> {/*Cuando iniciamos sesion en el componente login, creamos un item en localStorage de la siguiente maner localStorage.setItem("userName", variableQueAlmacenaUserName)*/}
                <div onClick={HandleLogout}>X</div>
            </div>
        </header>
    )
}