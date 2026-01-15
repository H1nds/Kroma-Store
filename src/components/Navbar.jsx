import { Link } from 'react-router-dom'
import { ShoppingBag, Search, Menu, User } from 'lucide-react'
import { useState } from 'react'
import KromaIcon from './KromaIcon'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { totalItems } = useCart()

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#fdfdf1]/90 backdrop-blur-md border-b border-[#2b323f]/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24"> {/* Aumenté un poco la altura */}
                    <Link to="/" className="flex items-center gap-4 group">
                   
                        <KromaIcon className="h-12 w-auto text-[#2b323f] group-hover:text-[#EC5E27] transition-colors duration-300" />
                            
                        <span className="text-3xl font-bold text-[#2b323f] font-kroma-logo">
                          KROMA
                        </span>
                      </Link>

                    {/* MENÚ DE ESCRITORIO */}
                    <div className="hidden md:flex space-x-10 items-center">
                        {/* Usamos uppercase y tracking-wide para ese toque "fashion" */}
                        <Link to="/" className="text-[#2b323f] hover:text-[#EC5E27] transition-colors font-medium text-sm tracking-widest uppercase">
                            Inicio
                        </Link>
                        <Link to="/catalogo" className="text-[#2b323f] hover:text-[#EC5E27] transition-colors font-medium text-sm tracking-widest uppercase">
                            Colección
                        </Link>
                        <Link to="/nosotros" className="text-[#2b323f] hover:text-[#EC5E27] transition-colors font-medium text-sm tracking-widest uppercase">
                            Sobre Nosotros
                        </Link>
                    </div>

                    {/* ICONOS */}
                    <div className="hidden md:flex items-center space-x-6 text-[#2b323f]">
                        <button className="hover:text-[#EC5E27] transition-colors">
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <Link to="/admin" className="hover:text-[#EC5E27] transition-colors">
                            <User size={20} strokeWidth={1.5} />
                        </Link>
                        <Link to="/carrito" className="relative hover:text-[#EC5E27] transition-colors">
                            <ShoppingBag size={20} strokeWidth={1.5} />

                            {/* Solo mostramos el punto si hay items */}
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#EC5E27] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* BOTÓN MÓVIL */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#2b323f]">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MENÚ DESPLEGABLE MÓVIL */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#fdfdf1] border-b border-gray-200 absolute w-full">
                    <div className="px-4 py-6 space-y-4 flex flex-col items-center">
                        <Link to="/" className="text-[#2b323f] uppercase tracking-widest text-sm font-medium">Inicio</Link>
                        <Link to="/catalogo" className="text-[#2b323f] uppercase tracking-widest text-sm font-medium">Colección</Link>
                        <Link to="/carrito" className="text-[#2b323f] font-bold">Bolsa de Compras</Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar