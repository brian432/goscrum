import { useFormik } from "formik"

export const Register = () => {

    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = () => {
        alert()
    }

    const formik = useFormik({ initialValues,  onSubmit })
    const { handleChange, handleSubmit, values, errors } = formik

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div>
                    <label>Nombre de usuario</label>
                    <input
                        name="username"
                        type="text"
                        onChange={handleChange}
                        value={values.username} />
                    {errors.username && <div>{errors.username}</div>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={values.email} />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password} />
                    {errors.password && <div>{errors.password}</div>}
                </div>
                <input type="hidden" name="teamID" value="9db" />
                <div>
                    <label>Rol</label>
                    <select name="role" onChange={handleChange} value={values.role} >
                        <option value="Team Member">Team Member</option>
                        <option value="Team Leader">Team Leader</option>
                    </select>
                    {errors.role && <div>{errors.role}</div>}
                </div>
                <div>
                    <label>Continente</label>
                    <select name="continent" onChange={handleChange} value={values.continent} >
                        <option value="America">America</option>
                        <option value="Europa">Europa</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {errors.continent && <div>{errors.continent}</div>}
                </div><div>
                    <label>Region</label>
                    <select name="region" onChange={handleChange} value={values.region} >
                        <option value="Latam">Latam</option>
                        <option value="Brasil">Brasil</option>
                        <option value="America del Norte">America del Norte</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {errors.region && <div>{errors.region}</div>}
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div >
    )
}