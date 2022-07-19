import { Header } from "../../Header/Header"
import { TaskForm } from "../../TaskForm/TaskForm"
import './Tasks.css'
import { useSelector, useDispatch } from "react-redux"

import { Card } from "../../Card/Card"
import { getTasks, deleteTasks, editTaskStatusOrImportance } from "../../../store/actions/tasksActions"
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import debounce from "lodash.debounce";

import { useEffect, useState } from "react"


export const Tasks = () => {

    const dispatch = useDispatch() //importamos dispatch
    const { taskCreated } = useSelector(state => {
        return state.taskFormReducer
    })
    const { loading, error, tasks } = useSelector(state => { // traemos el estado del store mediante useSelector() y desestructutamos el estado con sus propiedades
        return state.tasksReducer
    })

    const [list, setList] = useState(null)
    const [renderList, setRenderList] = useState(null)
    const [tasksFromWho, setTasksFromWho] = useState("ALL")
    const [search, setSearch] = useState("")


    useEffect(() => {
        dispatch(getTasks(tasksFromWho === "ME" ? "/me" : "")) //cuando se monte el componente, enviamos una accion al reducer mediante dispatch
    }, [tasksFromWho, dispatch, taskCreated])

    useEffect(() => { //Cuando se monte el componente, evaluara si tasks existe y si existe, actualizara el estado local mediante setList() y setRenderListe() para luego mapear los datos y renderizar el componente
        if (tasks?.length) {
            setList(tasks)
            setRenderList(tasks)
        } else {
            setList(null)
            setRenderList(null)
        }
    }, [tasks])

    useEffect(() => {
        if (search)
            setRenderList(list.filter(data => data.title.startsWith(search)))
        else setRenderList(list)
    }, [search])

    const renderColumnCards = (text) => {
        return (
            renderList?.filter(data => data.status === text).map(card =>
                <Card
                    key={card._id}
                    card={card}
                    deleteCard={handleDelete}
                    editCardButton={handleEditCardButton}
                />)
        )
    }

    const handleChangeimportance = (event) => {
        if (event.currentTarget.value === "ALL") {
            setRenderList(list)
        } else {
            setRenderList(list.filter(data => data.importance === event.currentTarget.value))
        }
    }

    const handleSearch = debounce(event => {
        setSearch(event?.target?.value)
    }, 1000)

    const handleDelete = (id) => dispatch(deleteTasks(id))

    const handleEditCardButton = (card, change) => dispatch(editTaskStatusOrImportance(card, change))


    if (error) return <div>Hay un error</div>

    return (
        <>
            <Header />
            <main id="tasks">
                <TaskForm />
                <section className="wrapper_list">
                    <div className="container-search">
                        <div className="list_header">
                            <h2>Mis tareas</h2>
                        </div>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                onChange={(event) => setTasksFromWho(event.currentTarget.value)}
                            >
                                <FormControlLabel
                                    value="ME"
                                    control={<Radio />}
                                    label="Mis tareas"
                                />
                                <FormControlLabel
                                    value="ALL"
                                    control={<Radio />}
                                    label="Todas"
                                />
                            </RadioGroup>
                        </FormControl>
                        <div>
                            <input type="search" placeholder="Buscar por titulo..." onChange={handleSearch} />
                        </div>
                        <select name='importance' onChange={handleChangeimportance}>
                            <option value="">Seleccionar opción</option>
                            <option value="ALL">Todas</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                    </div>
                    <div className="list-group">
                        {
                            !renderList?.length ?
                                <div>No hay tareas creadas</div> :
                                loading ?
                                    <>
                                        <Skeleton height={50} width={90} />
                                    </> :
                                    <>
                                        <div className="list">
                                            <h4>Nuevas</h4>
                                            {
                                                renderColumnCards("NEW")
                                            }
                                        </div>
                                        <div className="list">
                                            <h4>En Progreso</h4>
                                            {
                                                renderColumnCards("IN PROGRESS")
                                            }
                                        </div>
                                        <div className="list">
                                            <h4>Finalizadas</h4>
                                            {
                                                renderColumnCards("FINISHED")
                                            }
                                        </div>
                                    </>
                        }

                    </div>

                </section>
            </main>
        </>
    )
}
