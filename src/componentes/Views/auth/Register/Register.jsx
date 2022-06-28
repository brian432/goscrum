import { useFormik } from "formik"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import '../Auth.css'
export const Register = () => {

    const [data, setData] = useState();

    useEffect(() => {
        fetch('../data')
            .then(response => response.json())
            .then(data => {console.log(data.result)})
    }, [])

    const initialValues = {
        username: "",
        password: "",
        email: "",
        teamID: "",
        role: "",
        continent: "",
        region: ""
    }

    const required = "* Campo obligatorio";

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4, "Ingrese mas de 3 caracteres").required(required),
        password: Yup.string().required(required),
        email: Yup.string().email("Debe ser un email valido").required(required),
        //teamID: Yup.string().required(required),
        role: Yup.string().required(required),
        continent: Yup.string().required(required),
        region: Yup.string().required(required),
    })

    const onSubmit = () => {
        alert()
    }

    const formik = useFormik({ initialValues, onSubmit, validationSchema })
    const { handleChange, handleSubmit, values, errors, touched, handleBlur } = formik

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div>
                    <label>Nombre de usuario</label>
                    <input
                        name="username"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username} />
                    {errors.username && touched.username && <span>{errors.username}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password} />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <input type="hidden" name="teamID" value="9db" />
                <div>
                    <label>Rol</label>
                    <select name="role" onChange={handleChange} onBlur={handleBlur} value={values.role} >
                        <option value="">Seleccionar rol...</option>
                        <option value="Team Member">Team Member</option>
                        <option value="Team Leader">Team Leader</option>
                    </select>
                    {errors.role && touched.role && <span>{errors.role}</span>}
                </div>
                <div>
                    <label>Continente</label>
                    <select name="continent" onChange={handleChange} onBlur={handleBlur} value={values.continent} >
                        <option value="">Seleccionar continente...</option>
                        <option value="America">America</option>
                        <option value="Europa">Europa</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {errors.continent && touched.continent && <span>{errors.continent}</span>}
                </div>
                <div>
                    <label>Region</label>
                    <select name="region" onChange={handleChange} onBlur={handleBlur} value={values.region} >
                        <option value="">Seleccionar region...</option>
                        <option value="Latam">Latam</option>
                        <option value="Brasil">Brasil</option>
                        <option value="America del Norte">America del Norte</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {errors.region && touched.region && <span>{errors.region}</span>}
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
                <div>
                    <Link to="/login">Ir a iniciar sesion</Link>
                </div>
            </form>
        </div >
    )
}