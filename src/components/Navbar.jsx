import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Search, Menu, User, LayoutDashboard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ADMIN_EMAIL } from '../utils/constants' // Importamos tu correo de admin
import KromaIcon from './KromaIcon' // Tu logo estrella en SVG

const Navbar = () => {
    // Estado para el menú móvil
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Hooks de contexto
    const { totalItems } = useCart() // Número de productos en el carrito
    const { user } = useAuth() // Usuario logueado actual

    // Verificamos si el usuario actual es el administrador
    // (Debe existir un usuario Y su email debe coincidir con el del jefe)
    const isAdmin = user && user.email === ADMIN_EMAIL

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#fdfdf1]/90 backdrop-blur-md border-b border-[#2b323f]/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">

                    {/* --- LOGOTIPO KROMA --- */}
                    <Link to="/" className="flex items-center gap-4 group">
                        {/* Icono animado */}
                        <KromaIcon className="h-12 w-auto text-[#2b323f] group-hover:text-[#EC5E27] transition-colors duration-300" />
                        {/* Texto elegante */}
                        <span className="text-3xl font-bold text-[#2b323f] font-kroma-logo">KROMA</span>
                    </Link>

                    {/* --- MENÚ DE ESCRITORIO (Centro) --- */}
                    <div className="hidden md:flex space-x-10 items-center">
                        <Link to="/" className="text-[#2b323f] hover:text-[#EC5E27] transition-colors font-medium text-sm tracking-widest uppercase">
                            Inicio
                        </Link>
                        <Link to="/catalogo" className="text-[#2b323f] hover:text-[#EC5E27] transition-colors font-medium text-sm tracking-widest uppercase">
                            Colección
                        </Link>
                        <Link to="/nosotros" className="text-[#2b323f] hover:text-[#EC5E27] transition-colors font-medium text-sm tracking-widest uppercase">
                            Sobre Nosotros
                        </Link>

                        {/* BOTÓN DE ADMIN (Solo visible para ti) */}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="text-[#EC5E27] font-bold text-xs tracking-widest uppercase flex items-center gap-2 border border-[#EC5E27] px-4 py-2 rounded-full hover:bg-[#EC5E27] hover:text-white transition-all"
                            >
                                <LayoutDashboard size={16} />
                                Panel Admin
                            </Link>
                        )}
                    </div>

                    {/* --- ICONOS DE ACCIÓN (Derecha) --- */}
                    <div className="hidden md:flex items-center space-x-6 text-[#2b323f]">

                        {/* Buscador (Atajo global al catálogo) */}
                        <Link to="/catalogo" className="hover:text-[#EC5E27] transition-colors" title="Buscar fragancias">
                            <Search size={20} strokeWidth={1.5} />
                        </Link>

                        {/* Icono de Usuario Inteligente */}
                        {/* Si hay user -> va a Perfil. Si no -> va a Login */}
                        <Link
                            to={user ? "/perfil" : "/login"}
                            className="hover:text-[#EC5E27] transition-colors flex items-center gap-2"
                            title={user ? "Ir a mi perfil" : "Iniciar Sesión"}
                        >
                            <User size={20} strokeWidth={1.5} />
                            {/* Opcional: Mostrar saludo pequeño si está logueado */}
                            {user && !isAdmin && <span className="text-[10px] font-bold uppercase hidden lg:block text-gray-400">Mi Cuenta</span>}
                        </Link>

                        {/* Carrito de Compras */}
                        <Link to="/carrito" className="relative hover:text-[#EC5E27] transition-colors">
                            <ShoppingBag size={20} strokeWidth={1.5} />

                            {/* Puntito rojo con contador (Solo si hay items) */}
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#EC5E27] text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* --- BOTÓN HAMBURGUESA (Móvil) --- */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* En móvil también mostramos el carrito fuera del menú */}
                        <Link to="/carrito" className="relative text-[#2b323f]">
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#EC5E27] rounded-full"></span>
                            )}
                        </Link>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#2b323f]">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#fdfdf1] border-b border-gray-200 absolute w-full shadow-xl">
                    <div className="px-4 py-6 space-y-4 flex flex-col">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[#2b323f] uppercase tracking-widest text-sm font-medium border-b border-gray-100 pb-2"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/catalogo"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[#2b323f] uppercase tracking-widest text-sm font-medium border-b border-gray-100 pb-2"
                        >
                            Colección
                        </Link>

                        {/* Enlace de Perfil Móvil */}
                        <Link
                            to={user ? "/perfil" : "/login"}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[#2b323f] uppercase tracking-widest text-sm font-medium border-b border-gray-100 pb-2 flex items-center gap-2"
                        >
                            <User size={16} />
                            {user ? "Mi Perfil" : "Iniciar Sesión"}
                        </Link>

                        {/* Enlace de Admin Móvil */}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[#EC5E27] font-bold uppercase tracking-widest text-sm bg-[#EC5E27]/10 p-3 rounded-lg flex items-center gap-2"
                            >
                                <LayoutDashboard size={16} />
                                Ir al Panel Admin
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar