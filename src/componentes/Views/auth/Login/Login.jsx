import { useFormik } from "formik"
import { useNavigate, Link } from 'react-router-dom'
import * as Yup from 'yup'
import '../Auth.css'

const { REACT_APP_API_ENDPOINT } = process.env

export const Login = () => {

    const navigate = useNavigate();

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
        fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: values.userName,
                password: values.password
            }),
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("token", data?.result?.token)
                navigate("/", { replace: true })

            })
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
                        value={values.userName} />
                    {errors.userName && touched.userName && <div>{errors.userName}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password} />
                    {errors.password && touched.password && <div>{errors.password}</div>}
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
                <div>
                    <Link to="/register">Registrarme</Link>
                </div>
            </form>
        </div >
    )
}