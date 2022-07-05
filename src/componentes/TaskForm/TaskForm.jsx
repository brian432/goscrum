import './TaskForm.css'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { REACT_APP_API_ENDPOINT } = process.env

const { REACT_APP_API_ENDPOINT } = process.env

export const TaskForm = () => {

    const initialValues = {
        title: "",
        status: "",
        importance: "",
        description: ""
    }


    const onSubmit = () => {
        fetch(`${REACT_APP_API_ENDPOINT}task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                task: values
            })
        })
            .then((response) => response.json())
            .then(data =>{
                resetForm()
                toast("Tu tarea se creo")
            }
               
            )
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
                        {errors.title && touched.title && <span>{errors.title}</span>}
                    </div>

                    <div>
                        <select name="status" value={values.status} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Seleccionar opción</option>
                            <option value="NEW">Nuevo</option>
                            <option value="IN PROGRESS">En proceso</option>
                            <option value="FINISHED">Terminada</option>
                        </select>
                        {errors.status && touched.status && <span>{errors.status}</span>}
                    </div>
                    <div>
                        <select name='importance' value={values.importance} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Seleccionar opción</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                        {errors.importance && touched.importance && <span>{errors.importance}</span>}
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Descripción"
                        />
                        {errors.description && touched.description && <span>{errors.description}</span>}
                    </div>
                    <button type='submit'>Crear</button>
                </div>
            </form>
            <ToastContainer/>
        </section>
    )
}