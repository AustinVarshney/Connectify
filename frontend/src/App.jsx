import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import SeeMeets from './pages/SeeMeets'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){
                navigate('/dashboard', {replace: false});
            }
        }
    },[location, navigate, setIsAuthenticated]);

    const PrivateRoute = ({element}) => {
        return isAuthenticated ? element : <Navigate to='/login'/>
    }

    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
                <Route path='/see-meets' element={<SeeMeets/>}/>
            </Routes>
        </div>
    )
}

export default App
