import { useFormik } from "formik"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { Switch, FormControlLabel } from "@mui/material"
import { v4 as uuidv4 } from 'uuid'
import Swal from "sweetalert2"
import '../Auth.css'
import { useDispatch, useSelector } from "react-redux"
import { getDataSelect, postRegister, switchRegister } from "../../../../store/actions/registerActions"

export const Register = () => {

    const { data, register } = useSelector(state => { return state.registerReducer })
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDataSelect())
        if (register) {
            dispatch(switchRegister())
            Swal.fire({
                title: 'Usuario creado correctamente',
                width: "400px",
                timer: 10000,
                timerProgressBar: true,
                confirmButtonText: 'Aceptar'
            })
            navigate("/", {
                replace: true
            })
        } else if (register === false) {
            Swal.fire({
                title: 'El usuario o el email ya estan registrados',
                text: 'Intentelo nuevamente',
                width: "400px",
                timer: 10000,
                timerProgressBar: true,
                confirmButtonText: 'Aceptar'
            })
            resetForm()
            dispatch(switchRegister())
        }
    }, [register])

    const initialValues = {
        userName: "",
        password: "",
        email: "",
        teamID: "",
        role: "",
        continent: "",
        region: "",
        switch: false
    }

    const required = "* Campo obligatorio";

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, "Ingrese mas de 3 caracteres").required(required),
        password: Yup.string().required(required),
        email: Yup.string().email("Debe ser un email valido").required(required),
        role: Yup.string().required(required),
        continent: Yup.string().required(required),
        region: Yup.string().required(required),
    })

    const handleChangeContinent = value => {
        setFieldValue('continent', value)
        if (value !== 'America') setFieldValue('region', 'Otro')
    }

    const onSubmit = () => {
        const teamID = !values.teamID ? uuidv4() : values.teamID
        dispatch(postRegister(values, teamID))
    }


    const formik = useFormik({ initialValues, onSubmit, validationSchema })
    const { handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm } = formik

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div>
                    <label>Nombre de usuario</label>
                    <input
                        name="userName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                        className={errors.userName && touched.userName && "campoObligatorio"} />
                    {errors.userName && touched.userName && <span className="primaryColor">{errors.userName}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={errors.email && touched.email && "campoObligatorio"} />
                    {errors.email && touched.email && <span className="primaryColor">{errors.email}</span>}
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
                    {errors.password && touched.password && <span className="primaryColor">{errors.password}</span>}
                </div>
                <FormControlLabel
                    control={
                        <Switch
                            value={values.switch}
                            onChange={() =>
                                formik.setFieldValue("switch", !formik.values.switch)
                            }
                            name="switch"
                            color="secondary"
                        />
                    }
                    label="Pervenecés a un equipo ya creado"
                />
                {
                    values.switch && (
                        <div>
                            <label>Por favor, introduce el identificador de equipo</label>
                            <input
                                type="text"
                                name="teamID"
                                value={values.teamID}
                                onChange={handleChange}
                            />
                        </div>
                    )
                }
                <div>
                    <label>Rol</label>
                    <select
                        name="role"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.role} >
                        <option value="">Seleccionar rol...</option>
                        {
                            data?.Rol?.map(option =>
                                <option value={option} key={option}>
                                    {option}
                                </option>)
                        }
                    </select>
                    {errors.role && touched.role && <span className="primaryColor">{errors.role}</span>}
                </div>
                <div>
                    <label>Continente</label>
                    <select
                        name="continent"
                        onChange={event =>
                            handleChangeContinent(event.currentTarget.value)}
                        onBlur={handleBlur}
                        value={values.continent} >
                        <option value="">Seleccionar continente...</option>
                        {
                            data?.continente?.map(option =>
                                <option value={option} key={option}>
                                    {option}
                                </option>)
                        }
                    </select>
                    {errors.continent && touched.continent && <span className="primaryColor">{errors.continent}</span>}
                </div>
                {values.continent === "America" && (
                    <div>
                        <label>Region</label>
                        <select
                            name="region"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.region}>
                            <option value="">Seleccionar region...</option>
                            {
                                data?.region?.map(option =>
                                    option === "America del Norte" ? null :
                                        <option value={option === "Brasil" ? "Brazil" : option} key={option}>
                                            {option}
                                        </option>
                                )
                            }
                        </select>
                        {errors.region && touched.region && <span className="primaryColor">{errors.region}</span>}
                    </div>
                )}

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