import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Gem } from 'lucide-react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-24 pb-12">

            {/* SECCIÓN 1: El Manifiesto (Hero) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[#EC5E27] font-bold tracking-widest uppercase text-xs mb-4 block"
                >
                    Nuestra Historia
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-kroma-logo text-[#2b323f] max-w-4xl mx-auto leading-tight mb-8"
                >
                    Toda gran esencia cuenta <br className="hidden md:block" />
                    <span className="italic font-light">una historia inolvidable.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
                >
                    Kroma nació de una premisa simple: acceder a la alta perfumería debería ser una experiencia tan exclusiva y personal como la fragancia misma. No somos una tienda tradicional; somos tu Personal Shopper dedicado a encontrar ese detalle que te define.
                </motion.p>
            </section>

            {/* SECCIÓN 2: Los Pilares (Grid) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-[#EC5E27] transition-colors group"
                    >
                        <div className="w-16 h-16 mx-auto bg-[#EC5E27]/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Gem size={32} className="text-[#EC5E27]" />
                        </div>
                        <h3 className="text-xl font-kroma-logo text-[#2b323f] mb-4">Curaduría Exclusiva</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Seleccionamos meticulosamente cada pieza de nuestro catálogo. Trabajamos únicamente con casas de diseño reconocidas y proveedores certificados.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-[#EC5E27] transition-colors group"
                    >
                        <div className="w-16 h-16 mx-auto bg-[#EC5E27]/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={32} className="text-[#EC5E27]" />
                        </div>
                        <h3 className="text-xl font-kroma-logo text-[#2b323f] mb-4">Garantía de Origen</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            La confianza es nuestro mayor activo. Aseguramos la originalidad absoluta de cada fragancia que entregamos en tus manos.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-[#EC5E27] transition-colors group"
                    >
                        <div className="w-16 h-16 mx-auto bg-[#EC5E27]/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Sparkles size={32} className="text-[#EC5E27]" />
                        </div>
                        <h3 className="text-xl font-kroma-logo text-[#2b323f] mb-4">Atención Personalizada</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Entendemos que un perfume es una extensión de tu identidad. Nuestro servicio a pedido garantiza que obtengas exactamente lo que deseas.
                        </p>
                    </motion.div>

                </div>
            </section>

            {/* SECCIÓN 3: Llamado a la acción */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-[#2b323f] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#EC5E27]/20 to-transparent opacity-50"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-kroma-logo text-[#fdfdf1] mb-6">
                            ¿Listo para encontrar tu firma olfativa?
                        </h2>
                        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
                            Explora nuestra colección curada y déjanos encargarnos del resto.
                        </p>
                        <Link
                            to="/catalogo"
                            className="inline-flex items-center justify-center gap-2 bg-[#fdfdf1] text-[#2b323f] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#EC5E27] hover:text-white transition-all duration-300 shadow-xl"
                        >
                            Ver Colección
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AboutPage