import './Header.css'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/actions/loginActions';

import { useSelector, useDispatch } from "react-redux"

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { tasks } = useSelector(state => { 
        return state.tasksReducer
    })

    const HandleLogout = () => {
        dispatch(logout())
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