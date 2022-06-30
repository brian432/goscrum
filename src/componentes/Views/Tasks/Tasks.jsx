import { Header } from "../../Header/Header"
import { TaskForm } from "../../TaskForm/TaskForm"
import './Tasks.css'
import {cardData} from './data'

export const Tasks = () => {
    return (
        <>
            <Header />
            <main id="tasks">
                <TaskForm />
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>Mis tareas</h2>
                    </div>
                    <div className="list">
                        {
                            cardData.map((card, index) =>
                                <div className="container" key={index}>
                                    <h4 className="tipo">{card.tipo}</h4>
                                    <div className="card">
                                        <div className="close">X</div>
                                        <h3>Tarea {card.id}</h3>
                                        <h6>{card.fecha}</h6>
                                        <h5>{card.nombre}</h5>
                                        <button type="button">Nueva</button>
                                        <button type="button">Alta</button>
                                        <p>{card.descripcion}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
            </main>
        </>
    )
}
