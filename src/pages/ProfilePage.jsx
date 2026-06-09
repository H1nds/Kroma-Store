import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, User, Package } from 'lucide-react'

const ProfilePage = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-[#fdfdf1] pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-4">

                <h1 className="text-3xl font-kroma-logo text-[#2b323f] mb-8">Mi Perfil</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Cabecera del Perfil */}
                    <div className="bg-[#2b323f] p-8 text-white flex items-center gap-6">
                        <div className="w-20 h-20 bg-[#EC5E27] rounded-full flex items-center justify-center text-3xl font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{user?.displayName || user?.email}</h2>
                            <span className="text-gray-400 text-sm">Miembro de Kroma</span>
                        </div>
                    </div>

                    {/* Opciones */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                            {/* Tarjeta de Pedidos */}
                            <Link to="/mis-pedidos" className="p-6 border border-gray-100 rounded-xl hover:border-[#EC5E27] transition-colors cursor-pointer group block">
                                <Package className="text-[#EC5E27] mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="font-bold text-[#2b323f] mb-2">Mis Pedidos</h3>
                                <p className="text-sm text-gray-500">Revisa el estado de tus compras recientes.</p>
                            </Link>

                            {/* Tarjeta de Datos Personales funcional */}
                            <Link to="/datos-personales" className="p-6 border border-gray-100 rounded-xl hover:border-[#EC5E27] transition-colors cursor-pointer group block">
                                <User className="text-[#EC5E27] mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="font-bold text-[#2b323f] mb-2">Datos Personales</h3>
                                <p className="text-sm text-gray-500">Actualiza tu dirección y contraseña.</p>
                            </Link>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            Cerrar Sesión
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage