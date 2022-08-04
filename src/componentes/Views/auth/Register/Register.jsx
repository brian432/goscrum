import { Formik, Form, Field } from "formik"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { Switch, FormControlLabel } from "@mui/material"
import { v4 as uuidv4 } from 'uuid'
import '../Auth.css'
import { useDispatch, useSelector } from "react-redux"
import { getDataSelect, postRegister, switchRegister } from "../../../../store/actions/registerActions"
import { swalRegisterFalse, swalRegisterTrue } from "../../../../utils/swal"

export const Register = () => {

    const { data, register } = useSelector(state => { return state.registerReducer })
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDataSelect())
        if (register) {
            dispatch(switchRegister())
            swalRegisterTrue()
            navigate("/", {
                replace: true
            })
        } else if (register === false) {
            swalRegisterFalse()
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

    const handleChangeContinent = (value, setFieldValue) => {
        setFieldValue('continent', value)
        if (value !== 'America') setFieldValue('region', 'Otro')
    }

    return (
        <div className="auth">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const teamID = !values.teamID ? uuidv4() : values.teamID
                    dispatch(postRegister(values, teamID))
                }}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <h1>Registro</h1>
                        <div>
                            <label>Nombre de usuario</label>
                            <Field
                                name="userName"
                                className={errors.userName && touched.userName && "campoObligatorio"}
                            />
                            {errors.userName && touched.userName && <span className="primaryColor">{errors.userName}</span>}
                        </div>
                        <div>
                            <label>Email</label>
                            <Field
                                name="email"
                                className={errors.email && touched.email && "campoObligatorio"} />
                            {errors.email && touched.email && <span className="primaryColor">{errors.email}</span>}
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <Field
                                type="password"
                                name="password"
                                className={errors.password && touched.password && "campoObligatorio"} />
                            {errors.password && touched.password && <span className="primaryColor">{errors.password}</span>}
                        </div>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={() =>
                                        setFieldValue("switch", !values.switch)
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
                                    <Field
                                        name="teamID"
                                    />
                                </div>
                            )
                        }
                        <div>
                            <label>Rol</label>
                            <Field
                                as="select"
                                name="role"
                            >
                                <option value="">Seleccionar rol...</option>
                                {
                                    data?.Rol?.map(option =>
                                        <option value={option} key={option}>
                                            {option}
                                        </option>)
                                }
                            </Field>
                            {errors.role && touched.role && <span className="primaryColor">{errors.role}</span>}
                        </div>
                        <div>
                            <label>Continente</label>
                            <Field
                                as="select"
                                name="continent"
                                onChange={event => {
                                    handleChangeContinent(event.currentTarget.value, setFieldValue)
                                }}
                            >
                                <option value="">Seleccionar continente...</option>
                                {
                                    data?.continente?.map(option =>
                                        <option value={option} key={option}>
                                            {option}
                                        </option>)
                                }
                            </Field>
                            {errors.continent && touched.continent && <span className="primaryColor">{errors.continent}</span>}
                        </div>
                        {values.continent === "America" && (
                            <div>
                                <label>Region</label>
                                <Field
                                    as="select"
                                    name="region"
                                >
                                    <option value="">Seleccionar region...</option>
                                    {
                                        data?.region?.map(option =>
                                            option === "America del Norte" ? null :
                                                <option value={option === "Brasil" ? "Brazil" : option} key={option}>
                                                    {option}
                                                </option>
                                        )
                                    }
                                </Field>
                                {errors.region && touched.region && <span className="primaryColor">{errors.region}</span>}
                            </div>
                        )}
                        <div>
                            <button type="submit">Enviar</button>
                        </div>
                        <div>
                            <Link to="/login">Ir a iniciar sesion</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}