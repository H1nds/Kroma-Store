import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react'
import KromaIcon from './KromaIcon' // Tu logo estrella

const Footer = () => {
    return (
        <footer className="bg-[#2b323f] text-[#fdfdf1] pt-16 pb-8 border-t border-[#fdfdf1]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* GRID DE 4 COLUMNAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* COLUMNA 1: MARCA */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3">
                            <KromaIcon className="h-8 w-auto text-[#fdfdf1]" />
                            <span className="text-2xl font-bold font-kroma-logo tracking-widest">KROMA</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Tu personal shopper de alta perfumería. Llevamos la esencia de las marcas más exclusivas directamente a tu puerta.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-[#EC5E27] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-[#EC5E27] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-[#EC5E27] transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* COLUMNA 2: EXPLORAR */}
                    <div>
                        <h4 className="text-lg font-bold font-kroma-logo mb-6">Explorar</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-[#EC5E27] transition-colors">Inicio</Link></li>
                            <li><Link to="/catalogo" className="hover:text-[#EC5E27] transition-colors">Colección Completa</Link></li>
                            <li><Link to="/nosotros" className="hover:text-[#EC5E27] transition-colors">Sobre Nosotros</Link></li>
                            <li><Link to="/contacto" className="hover:text-[#EC5E27] transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* COLUMNA 3: LEGAL & AYUDA */}
                    <div>
                        <h4 className="text-lg font-bold font-kroma-logo mb-6">Ayuda</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/envios" className="hover:text-[#EC5E27] transition-colors">Envíos y Entregas</Link></li>
                            <li><Link to="/devoluciones" className="hover:text-[#EC5E27] transition-colors">Política de Devoluciones</Link></li>
                            <li><Link to="/faq" className="hover:text-[#EC5E27] transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link to="/terminos" className="hover:text-[#EC5E27] transition-colors">Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    {/* COLUMNA 4: NEWSLETTER */}
                    <div>
                        <h4 className="text-lg font-bold font-kroma-logo mb-6">Únete a Kroma</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Suscríbete para recibir novedades exclusivas y acceso anticipado.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Tu correo..."
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:border-[#EC5E27] transition-colors"
                            />
                            <button className="bg-[#EC5E27] text-white p-2 rounded-full hover:bg-[#d64e1c] transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* BARRA DE COPYRIGHT */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">© {new Date().getFullYear()} Kroma Store. Todos los derechos reservados.</p>
                    <div className="flex gap-6 text-xs text-gray-500">
                        <span>Privacidad</span>
                        <span>Cookies</span>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer