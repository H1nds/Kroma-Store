import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserOrders, deleteOrder } from '../services/orderService'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, PackageSearch, Receipt } from 'lucide-react'
import Swal from 'sweetalert2'
import LoadingScreen from '../components/LoadingScreen'

const OrdersPage = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) fetchOrders()
    }, [user])

    const fetchOrders = async () => {
        const data = await getUserOrders(user.email)
        // Ordenar del más nuevo al más viejo
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        setLoading(false)
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar historial?',
            text: "Esto no cancela el envío si ya fue procesado, solo lo borra de tu historial.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EC5E27',
            cancelButtonColor: '#2b323f',
            confirmButtonText: 'Eliminar'
        })

        if (result.isConfirmed) {
            await deleteOrder(id)
            fetchOrders()
            Swal.fire({ title: 'Eliminado', icon: 'success', toast: true, position: 'bottom-end', timer: 2000, showConfirmButton: false })
        }
    }

    const statusConfig = {
        'pendiente': { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Pendiente de Aprobación' },
        'aprobado': { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Pedido Aprobado' },
        'en_camino': { color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'En Camino' },
        'entregado': { color: 'bg-green-100 text-green-700 border-green-200', label: 'Entregado' },
        'cancelado': { color: 'bg-red-100 text-red-700 border-red-200', label: 'Cancelado' }
    }

    if (loading) return <LoadingScreen />

    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-28 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link to="/perfil" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-8 transition-colors">
                    <ArrowLeft size={16} /> Volver al perfil
                </Link>

                <h1 className="text-3xl font-kroma-logo text-[#2b323f] mb-8 flex items-center gap-3">
                    <Receipt size={32} className="text-[#EC5E27]" /> Mis Pedidos
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
                        <PackageSearch size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Aún no tienes pedidos en tu historial.</p>
                        <Link to="/catalogo" className="mt-4 inline-block text-[#EC5E27] font-bold hover:underline">Ir de compras</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative"
                            >
                                {/* Estética de Ticket/Recibo */}
                                <div className="absolute top-0 left-0 w-2 h-full bg-[#2b323f]"></div>

                                <div className="p-6 md:p-8 pl-8 md:pl-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-100 pb-6">
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                                                {new Date(order.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                            <h3 className="text-xl font-kroma-logo text-[#2b323f]">Serie: {order.serial}</h3>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${statusConfig[order.status]?.color}`}>
                                                {statusConfig[order.status]?.label}
                                            </span>

                                            {/* Lógica de Borrado */}
                                            {(order.status === 'pendiente' || order.status === 'entregado') && (
                                                <button onClick={() => handleDelete(order.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Eliminar del historial">
                                                    <Trash2 size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm text-gray-600">
                                                <span><span className="font-bold text-[#2b323f]">{item.quantity}x</span> {item.name}</span>
                                                <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                                        <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Total Pagado</span>
                                        <span className="text-2xl font-kroma-logo text-[#2b323f]">S/ {parseFloat(order.total).toFixed(2)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdersPage