import { Route, Routes, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Login } from './componentes/Views/Login/Login'
import { Register } from './componentes/Views/Register/Register'
import { Error404 } from './componentes/Views/Error404/Error404'
import { Tasks } from './componentes/Views/Tasks/Tasks'
import './App.css'




const RequireAuth = ({ children }) => { /*children hace referencia al componente hijo de RequireAuth*/ 
    if (!localStorage.getItem("logged")) { //Si no esta logeado, la app nos redirige hacia el componente login
        return <Navigate to="/login" />
    }
    return children //si esta logeado, la app nos redirige hacia el componente hijo de RequireAuth
}

const pageTransition = { //objeto con los valores que vamos a referenciar dentro de los componentes de framer-motion
    in: { opacity: 1, },
    out: { opacity: 0, }
}

export const App = () => (
    <AnimatePresence>
        <Routes>
            <Route
                path="/"
                element={
                    <motion.div
                        className="page" //nombre de clase por defecto para framer-motion
                        initial="out" //inicio de la animacion
                        animate="in" //a la mitad de la animacion
                        exit="out" //final de animacion
                        variants={pageTransition} //objeto que ofrece contexto a las animaicon de motion.
                    >
                        <RequireAuth>
                            <Tasks />
                        </RequireAuth>

                    </motion.div>
                }
            />
            <Route
                path="/login"
                element={
                    <motion.div
                        className="page"
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
                    >
                        <Login />
                    </motion.div>
                }
            />
            <Route
                path="*"
                element={
                    <motion.div
                        className="page"
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
                    >
                        <Error404 />
                    </motion.div>
                }
            />
        </Routes>
    </AnimatePresence>
)
