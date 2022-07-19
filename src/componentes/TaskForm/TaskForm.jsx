import './TaskForm.css'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { postTask, switchTaskCreated } from '../../store/actions/taskFormActions';
import { useEffect } from 'react';

export const TaskForm = () => {

    const dispatch = useDispatch()
    const  {taskCreated}  = useSelector(state => { return state.taskFormReducer })

    useEffect(() => {
        if (taskCreated) { //Si la tarea se creo, taskCreated === true, cuando esto sucede, reseteamos el formulario, creamos un alerta con toast y volvemos a taskCreated === null porque si no lo hacemos, la constante quedara en true y al volverse a crear una tarea, el efecto secundario esperado no ocurrira porque taskCreated no cambia su valor 
            resetForm()
            toast("Tu tarea se creo")
            dispatch(switchTaskCreated())
        }
    }, [taskCreated])

    const initialValues = {
        title: "",
        status: "",
        importance: "",
        description: ""
    }

    const onSubmit = () => {
        dispatch(postTask(values))
    }

    const required = "* Campo obligatorio"

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(6, "Ingrese mas de 5 caracteres").required(required),
        status: Yup.string().required(required),
        importance: Yup.string().required(required),
        description: Yup.string().required(required),
    })

    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { handleChange, handleSubmit, errors, touched, handleBlur, values, resetForm } = formik //errors para los manejar los errores, touched para mostrar un mensaje al salir de un campo sin completarlo


    return (
        <section className="task-form">
            <h2>Crear tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} placeholder="Título" />
                        {errors.title && touched.title && <span className='primaryColor'>{errors.title}</span>}
                    </div>

                    <div>
                        <select name="status" value={values.status} onChange={handleChange} onBlur={handleBlur} >
                            <option value="">Seleccionar opción</option>
                            <option value="NEW">Nuevo</option>
                            <option value="IN PROGRESS">En proceso</option>
                            <option value="FINISHED">Terminada</option>
                        </select>
                        {errors.status && touched.status && <span className='primaryColor'>{errors.status}</span>}
                    </div>
                    <div>
                        <select name='importance' value={values.importance} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Seleccionar opción</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                        {errors.importance && touched.importance && <span className='primaryColor'>{errors.importance}</span>}
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Descripción"
                        />
                        {errors.description && touched.description && <span className='primaryColor'>{errors.description}</span>}
                    </div>
                    <button type='submit'>Crear</button>
                </div>
            </form>
            <ToastContainer />
        </section>
    )
}