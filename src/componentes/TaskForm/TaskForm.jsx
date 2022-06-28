import './TaskForm.css'
import { useFormik } from "formik"
import * as Yup from 'yup'

export const TaskForm = () => {

    const initialValues = {
        title: "",
        status: "",
        priority: "",
        description: ""
    }


    const onSubmit = () => {
        alert("dsadas")
    }

    const validationSchema = Yup.object().shape({
        title:Yup.string().min(6, "Ingrese mas de 5 caracteres").required("* Campo obligatorio"),
        status:Yup.string().required("* Campo obligatorio"),
        priority:Yup.string().required("* Campo obligatorio")
    })

    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { handleChange, handleSubmit, errors, touched, handleBlur } = formik //errors para los manejar los errores, touched para mostrar un mensaje al salir de un campo sin completarlo


    return (
        <section className="task-form">
            <h2>Crear tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="title" onChange={handleChange} onBlur={handleBlur} placeholder="Título"/>
                        {errors.title && touched.title && <span>{errors.title}</span>}
                    </div>
                    
                    <div>
                        <select name="status" onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Seleccionar opción</option>
                            <option value="new">Nuevo</option>
                            <option value="inProcess">En proceso</option>
                            <option value="finished">Terminada</option>
                        </select>
                        {errors.status && touched.status && <span>{errors.status}</span>}
                    </div>   
                    <div>
                        <select name='priority' onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Seleccionar opción</option>
                            <option value="low">Baja</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                        </select>
                        {errors.priority && touched.priority && <span>{errors.priority}</span>}
                    </div>
                    <div>
                        <textarea name="description" onChange={handleChange} placeholder="Descripción" />
                    </div>
                    <button type='submit'>Crear</button>
                </div>
            </form>
        </section>
    )
}