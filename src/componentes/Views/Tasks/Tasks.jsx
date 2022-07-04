import { Header } from "../../Header/Header"
import { TaskForm } from "../../TaskForm/TaskForm"
import './Tasks.css'
import { Card } from "../../Card/Card"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react"

const { REACT_APP_API_ENDPOINT } = process.env

export const Tasks = () => {

    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${REACT_APP_API_ENDPOINT}task`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },

        })
            .then((response) => response.json())
            .then(data => {
                setList(data.result)
                setTimeout(()=>{
                    setLoading(false) //agregamos esta funcion para retrasar la carga de data.result y asi poder ver el efecto del reloader <skeleton />
                },10000)
            })
    }, [])

    const renderAllCards = () => {
        return (
            list?.map(card => <Card key={card._id} card={card} />)
        )
    }

    const renderNewCards = () => {
        return (
            list?.filter(data => data.status === "NEW").map(card => <Card key={card._id} card={card} />)
        )
    }
    const renderInProgressCards = () => {
        return (
            list?.filter(data => data.status === "IN PROGRESS").map(card => <Card key={card._id} card={card} />)
        )
    }
    const renderFinishedCards = () => {
        return (
            list?.filter(data => data.status === "FINISHED").map(card => <Card key={card._id} card={card} />)
        )
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
                    <div className="list-group">
                        {
                            !list?.length?
                                <div>No hay tareas creadas</div> :
                                loading ? 
                                <>
                                    <Skeleton height={50} width={90} />
                                </>:
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
