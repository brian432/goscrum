import './TaskForm.css'
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { postTask, switchTaskCreated } from '../../store/actions/taskFormActions';
import { useEffect } from 'react';

export const TaskForm = () => {
    const dispatch = useDispatch()
    const { taskCreated } = useSelector(state => { return state.taskFormReducer })

    useEffect(() => {
        if (taskCreated) {
            toast("Tu tarea se creo")
            dispatch(switchTaskCreated())
        }
    }, [taskCreated])

    const required = "* Campo obligatorio"

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(6, "Ingrese mas de 5 caracteres").required(required),
        status: Yup.string().required(required),
        importance: Yup.string().required(required),
        description: Yup.string().required(required),
    })
    return (
        <section className="task-form">
            <h2>Crear tarea</h2>
            <p>Crea tus tareas</p>
            <Formik
                initialValues={{
                    title: "",
                    status: "",
                    importance: "",
                    description: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    dispatch(postTask(values))
                    resetForm()
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <div>
                                <Field
                                    name="title"
                                    placeholder="Título"
                                />
                                {errors.title && touched.title  ? (
                                    <span className='primaryColor'>{errors.title}</span>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    as="select"
                                    name="status"
                                >
                                    <option value="">Seleccionar opción</option>
                                    <option value="NEW">Nuevo</option>
                                    <option value="IN PROGRESS">En proceso</option>
                                    <option value="FINISHED">Terminada</option>
                                </Field>
                                {errors.status && touched.status ? (
                                    <span className='primaryColor'>{errors.status}</span>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    as="select"
                                    name="importance"
                                >
                                    <option value="">Seleccionar opción</option>
                                    <option value="LOW">Baja</option>
                                    <option value="MEDIUM">Media</option>
                                    <option value="HIGH">Alta</option>
                                </Field>
                                {errors.importance && touched.importance ? (
                                    <span className='primaryColor'>{errors.importance}</span>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Descripción"
                                />
                                {errors.description && touched.description  ? (
                                    <span className='primaryColor'>{errors.description}</span>
                                ) : null}
                            </div>
                            <button type='submit'>Crear</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </section>
    )
}