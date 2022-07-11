import { useFormik } from "formik"
import { useNavigate, Link } from 'react-router-dom'
import * as Yup from 'yup'
import '../Auth.css'
import { swal } from "../../../../utils/swal"

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
                if (data.status_code === 200) {
                    localStorage.setItem("token", data?.result?.token)
                    localStorage.setItem("userName", data?.result?.user?.userName)
                    navigate("/", { replace: true })
                }else{
                    swal()
                }

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
                        value={values.userName} 
                        className={errors.userName && touched.userName && "campoObligatorio"}/>
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
                        className={errors.password && touched.password && "campoObligatorio"}/>
                    {errors.password && touched.password && <div className="primaryColor">{errors.password}</div>}
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