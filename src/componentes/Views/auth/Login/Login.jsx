import { Formik, Form, Field } from "formik"
import { useNavigate, Link } from 'react-router-dom'
import * as Yup from 'yup'
import '../Auth.css'
import { swal } from "../../../../utils/swal"

import { localStorageSaved, loginIncorrect } from "../../../../store/actions/loginActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

export const Login = () => {

    const { login } = useSelector(state => { return state.loginReducer })
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (login === true) {
            navigate("/", { replace: true })
        }
        else if (login === false) {
            swal()
            dispatch(loginIncorrect())
        }
    }, [login])

    const required = "* Campo obligatorio"

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, "Ingrese mas de 3 caracteres").required(required),
        password: Yup.string().required(required)
    })

    return (
        <div className="auth">
            <Formik
                initialValues={{
                    userName: "",
                    password: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(localStorageSaved(values.userName, values.password))
                }}
            >
            {({ errors, touched }) => (
                <Form>
                    <h1>Iniciar sesión</h1>
                    <div>
                        <label>Nombre de usuario</label>
                        <Field
                            name="userName"
                            className={errors.userName && touched.userName && "campoObligatorio"}
                        />
                        {errors.userName && touched.userName ? (
                            <span className='primaryColor'>{errors.userName}</span>
                        ) : null}
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <Field
                            name="password"
                            type="password"
                            className={errors.password && touched.password && "campoObligatorio"}
                        />
                        {errors.password && touched.password ? (
                            <span className='primaryColor'>{errors.password}</span>
                        ) : null}
                    </div>
                    <div>
                        <button type="submit">Enviar</button>
                    </div>
                    <Link to="/register">Registrarme</Link>
                </Form>
            )}
            </Formik>
        </div >
    )
}