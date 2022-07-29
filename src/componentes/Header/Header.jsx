import './Header.css'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/actions/loginActions';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import logo from './logo.png'

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showTeamID, setShowTeamID] = useState(false)
    const teamID = localStorage.getItem("teamID");
    const { tasks } = useSelector(state => {
        return state.tasksReducer
    })
    const HandleLogout = () => {
        dispatch(logout())
        navigate("/Login", { replace: true })
    }
    return (
        <header>
            <div className='container-header'>
                <div className='div-img'>
                    <img src={logo} alt="logo"/>
                </div>
                <div className='wrapper_rigth_header'>
                    <div>Tareas creadas: {tasks?.length}</div>
                    <div>{localStorage.getItem("userName")}</div> {/*Cuando iniciamos sesion en el componente login, creamos un item en localStorage de la siguiente maner localStorage.setItem("userName", variableQueAlmacenaUserName)*/}
                    <div className='logout' onClick={HandleLogout}>X</div>
                </div>
            </div>
            {
                !showTeamID ?
                    <button onClick={() => setShowTeamID(true)}>Ver el teamID</button> :
                    <>
                        <span>TeamID: {teamID}</span><button onClick={() => setShowTeamID(false)}>Ver menos</button>
                    </>
            }
        </header>
    )
}