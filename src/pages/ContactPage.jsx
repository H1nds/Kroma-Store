import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#fdfdf1] pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Info */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-kroma-logo text-[#2b323f] mb-6">Hablemos</h1>
                    <p className="text-gray-500 text-lg mb-12">
                        ¿Buscas una fragancia en específico que no está en el catálogo? ¿Tienes dudas sobre tu pedido? Escríbenos y te atenderemos de forma personalizada.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#EC5E27] shrink-0">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2b323f] mb-1">WhatsApp Directo</h3>
                                <p className="text-gray-500">+51 953 704 345</p>
                                <a href="https://wa.me/51953704345" target="_blank" rel="noreferrer" className="text-[#EC5E27] text-sm font-bold mt-2 inline-block hover:underline">Enviar mensaje</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#EC5E27] shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2b323f] mb-1">Correo Electrónico</h3>
                                <p className="text-gray-500">contacto@kroma.pe</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#EC5E27] shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2b323f] mb-1">Cobertura</h3>
                                <p className="text-gray-500">Envíos a nivel nacional desde el sur del Perú.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario Estético (Visual) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <h3 className="text-2xl font-kroma-logo text-[#2b323f] mb-6">Envíanos un mensaje</h3>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nombre</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]" placeholder="Tu nombre" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Correo</label>
                            <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]" placeholder="tu@correo.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Mensaje</label>
                            <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27]" placeholder="¿En qué podemos ayudarte?"></textarea>
                        </div>
                        <button className="w-full bg-[#2b323f] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#EC5E27] transition-colors mt-2">
                            Enviar Consulta
                        </button>
                    </form>
                </motion.div>

            </div>
        </div>
    )
}

export default ContactPage