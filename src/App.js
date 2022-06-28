import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Login } from './componentes/Views/auth/Login/Login'
import { Register } from './componentes/Views/auth/Register/Register'
import { Tasks } from './componentes/Views/Tasks/Tasks'
import './App.css'

const Error404=lazy(()=>import('./componentes/Views/Error404/Error404')); //ver Lazy tutorial

const RequireAuth = ({ children }) => { /*children hace referencia al componente hijo de RequireAuth*/
    if (!localStorage.getItem("logged")) { //Si no esta logeado, la app nos redirige hacia el componente login
        return <Navigate to="/login" replace={true} />
    }
    return children //si esta logeado, la app nos redirige hacia el componente hijo de RequireAuth
}

const pageTransition = { //es un objeto con los valores que vamos a referenciar dentro de los componentes de framer-motion
    in: { opacity: 1, },
    out: { opacity: 0, }
}

export const App = () => {

    const location=useLocation();
    
    return (
        < AnimatePresence >
            <Routes location={location} key={location.pathname}> {/*Utilizamos location para que cuando haya un cambio de ruta, framer-motion lo escuche y haga las animaciones*/}
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
                    path="/register"
                    element={
                        <motion.div
                            className="page"
                            initial="out"
                            animate="in"
                            exit="out"
                            variants={pageTransition}
                        >
                            <Register />
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
                            <Suspense fallback={<div>cargandoo...</div>}>
                                <Error404 />
                            </Suspense>
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence >
    )
}
