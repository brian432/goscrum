import { useFormik } from "formik"
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

    const initialValues = {
        userName: "",
        password: ""
    }

    const required = "* Campo obligatorio"

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, "Ingrese mas de 3 caracteres").required(required),
        password: Yup.string().required(required)
    })

    const onSubmit = () => {
        dispatch(localStorageSaved(values.userName, values.password))
    }


    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { handleChange, handleSubmit, values, errors, touched, handleBlur } = formik

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Iniciar sesion</h1>
                <div>
                    <label>Nombre de usuario</label>
                    <input
                        name="userName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                        className={errors.userName && touched.userName && "campoObligatorio"} />
                    {errors.userName && touched.userName && <div className="primaryColor">{errors.userName}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={errors.password && touched.password && "campoObligatorio"} />
                    {errors.password && touched.password && <div className="primaryColor">{errors.password}</div>}
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
                <Link to="/register">Registrarme</Link>
            </form>
        </div >
    )
}