import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ADMIN_EMAIL } from '../utils/constants' // <--- Usamos la constante

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return <div className="p-20 text-center">Cargando...</div>

    // Comparación exacta
    if (!user || user.email !== ADMIN_EMAIL) {
        return <Navigate to="/login" />
    }

    return children
}

export default AdminRoute