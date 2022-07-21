import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Login } from './componentes/Views/auth/Login/Login'
import { Register } from './componentes/Views/auth/Register/Register'
import { Tasks } from './componentes/Views/Tasks/Tasks'
import './App.css'


const Error404=lazy(()=>import('./componentes/Views/Error404/Error404')); 

const RequireAuth = ({ children }) => { 
    if (!localStorage.getItem("token")) { 
        return <Navigate to="/login" replace={true} />
    }
    return children 
}

const pageTransition = {
    in: { opacity: 1, },
    out: { opacity: 0, }
}

export const App = () => {

    const location=useLocation();
    
    return (
        < AnimatePresence >
            <Routes location={location} key={location.pathname}> 
                <Route
                    path="/"
                    element={
                        <motion.div
                            className="page" 
                            initial="out" 
                            animate="in" 
                            exit="out" 
                            variants={pageTransition} 
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
