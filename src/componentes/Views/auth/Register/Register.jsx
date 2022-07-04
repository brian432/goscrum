import { useFormik } from "formik"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { Switch, FormControlLabel } from "@mui/material"
import { v4 as uuidv4 } from 'uuid'
import '../Auth.css'

const { REACT_APP_API_ENDPOINT } = process.env

export const Register = () => {

    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
            .then(response => response.json())
            .then(data => setData(data.result))
    }, [])
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
        fetch(`${REACT_APP_API_ENDPOINT}auth/register`, { //Recordar que al probar la api, siempre cambiar el nombre de usuario y el email porque sino el post request tirara un error
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    userName: values.userName,
                    password: values.password,
                    email: values.email,
                    teamID,
                    role: values.role,
                    continent: values.continent,
                    region: values.region,
                },
            }),
        })
            .then((response) => response.json())
            .then(data =>
                navigate("/registered/" + data?.result?.user?.teamID, {
                    replace: true
                })
            )

    }


    const formik = useFormik({ initialValues, onSubmit, validationSchema })
    const { handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue } = formik

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
                        value={values.userName} />
                    {errors.userName && touched.userName && <span>{errors.userName}</span>}
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
                    {errors.role && touched.role && <span>{errors.role}</span>}
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
                    {errors.continent && touched.continent && <span>{errors.continent}</span>}
                </div>
                {values.continent === "America" && (
                    <div>
                        <label>Region</label>
                        <select
                            name="region"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.region} >
                            <option value="">Seleccionar region...</option>
                            {
                                data?.region?.map(option =>
                                    <option value={option} key={option}>
                                        {option}
                                    </option>)
                            }
                        </select>
                        {errors.region && touched.region && <span>{errors.region}</span>}
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