import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Home, ShoppingBag } from 'lucide-react'
import { useAuth } from '../context/AuthContext' // 1. Importamos la autenticación

const OrderSuccessPage = () => {
    const { user } = useAuth() // 2. Extraemos el usuario actual

    return (
        <div className="min-h-screen bg-[#fdfdf1] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#25D366]"
                >
                    <CheckCircle size={48} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-kroma-logo text-[#2b323f] mb-4"
                >
                    ¡Pedido Registrado!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 mb-2"
                >
                    Tu pedido ha pasado a estado de <span className="font-bold text-yellow-600">Pendiente de Aprobación</span>.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-gray-400 mb-10"
                >
                    Se ha abierto una pestaña de WhatsApp para coordinar el pago y la entrega.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-4"
                >
                    <Link
                        to="/"
                        className="w-full bg-[#2b323f] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#EC5E27] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Home size={20} />
                        Volver al Inicio
                    </Link>

                    {/* 3. Condicionamos este botón: Solo se renderiza si 'user' existe */}
                    {user && (
                        <Link
                            to="/mis-pedidos"
                            className="w-full bg-white text-[#2b323f] py-4 rounded-full font-bold uppercase tracking-widest border border-gray-200 hover:border-[#EC5E27] hover:text-[#EC5E27] transition-all flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={20} />
                            Ver mis pedidos
                        </Link>
                    )}
                </motion.div>

            </div>
        </div>
    )
}

export default OrderSuccessPage