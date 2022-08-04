import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Motion } from './componentes/motionDiv/motion'
import { Login } from './componentes/Views/auth/Login/Login'
import { Register } from './componentes/Views/auth/Register/Register'
import { Tasks } from './componentes/Views/Tasks/Tasks'
import { RequireAuth } from './componentes/requireAuth/requireAuth'
import './App.css'

const Error404 = lazy(() => import('./componentes/Views/Error404/Error404'));

export const App = () => {
    const location = useLocation();
    return (
        < AnimatePresence >
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <Motion>
                            <RequireAuth>
                                <Tasks />
                            </RequireAuth>
                        </Motion>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Motion>
                            <Login />
                        </Motion>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Motion>
                            <Register />
                        </Motion>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Motion>
                            <Suspense fallback={<div>cargandoo...</div>}>
                                <Error404 />
                            </Suspense>
                        </Motion>
                    }
                />
            </Routes>
        </AnimatePresence >
    )
}
