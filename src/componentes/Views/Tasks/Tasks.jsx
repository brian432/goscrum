import { Header } from "../../Header/Header"
import { TaskForm } from "../../TaskForm/TaskForm"
import './Tasks.css'
import { Card } from "../../Card/Card"
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react"

const { REACT_APP_API_ENDPOINT } = process.env

export const Tasks = () => {

    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [renderList, setRenderList] = useState(null)
    const [tasksFromWho, setTasksFromWho] = useState("ALL")
    useEffect(() => {
        setLoading(true)
        fetch(`${REACT_APP_API_ENDPOINT}task${tasksFromWho === "ME" ? "/me": ""}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },

        })
            .then((response) => response.json())
            .then(data => {
                setRenderList(data.result)
                setList(data.result)
                setTimeout(() => {
                    setLoading(false) //agregamos esta funcion para retrasar la carga de data.result y asi poder ver el efecto del reloader <skeleton />
                }, 1000)
            })
    }, [tasksFromWho])

    const renderAllCards = () => {
        return (
            renderList?.map(card => <Card key={card._id} card={card} />)
        )
    }

    const renderNewCards = () => {
        return (
            renderList?.filter(data => data.status === "NEW").map(card => <Card key={card._id} card={card} />)
        )
    }
    const renderInProgressCards = () => {
        return (
            renderList?.filter(data => data.status === "IN PROGRESS").map(card => <Card key={card._id} card={card} />)
        )
    }
    const renderFinishedCards = () => {
        return (
            renderList?.filter(data => data.status === "FINISHED").map(card => <Card key={card._id} card={card} />)
        )
    }

    const handleChangeimportance = (event) => {
        if (event.currentTarget.value === "ALL") {
            setRenderList(list)
        } else {
            setRenderList(list.filter(data => data.importance === event.currentTarget.value))
        }
    }

    return (
        <>
            <Header />
            <main id="tasks">
                <TaskForm />
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>Mis tareas</h2>
                    </div>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            onChange={(event)=> setTasksFromWho(event.currentTarget.value)}
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
                    <select name='importance' onChange={handleChangeimportance}>
                        <option value="">Seleccionar opción</option>
                        <option value="ALL">Todas</option>
                        <option value="LOW">Baja</option>
                        <option value="MEDIUM">Media</option>
                        <option value="HIGH">Alta</option>
                    </select>
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
                                                renderNewCards()
                                            }
                                        </div>
                                        <div className="list">
                                            <h4>En Progreso</h4>
                                            {
                                                renderInProgressCards()
                                            }
                                        </div>
                                        <div className="list">
                                            <h4>Finalizadas</h4>
                                            {
                                                renderFinishedCards()
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
