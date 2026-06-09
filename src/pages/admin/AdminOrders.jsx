import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllOrders, updateOrderStatus } from '../../services/orderService'
import { ArrowLeft, Search, CheckCircle, Truck, PackageCheck, XCircle } from 'lucide-react'
import Swal from 'sweetalert2'
import LoadingScreen from '../../components/LoadingScreen'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const data = await getAllOrders()
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        setLoading(false)
    }

    const handleStatusChange = async (id, newStatus, currentStatus) => {
        if (currentStatus === newStatus) return
        await updateOrderStatus(id, newStatus)
        fetchOrders() // Recargar
        Swal.fire({ title: 'Estado actualizado', icon: 'success', toast: true, position: 'bottom-end', timer: 1500, showConfirmButton: false })
    }

    // Filtrar por número de serie
    const filteredOrders = orders.filter(o => o.serial.toLowerCase().includes(searchTerm.toLowerCase()))

    if (loading) return <LoadingScreen />

    return (
        <div className="min-h-screen bg-[#fdfdf1] pt-28 pb-12 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <Link to="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-2 transition-colors">
                            <ArrowLeft size={16} /> Volver al panel de productos
                        </Link>
                        <h1 className="text-3xl font-kroma-logo text-[#2b323f]">Gestión de Pedidos</h1>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar serie (Ej: KRM-X8F)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#EC5E27] shadow-sm text-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest font-bold border-b border-gray-100">
                                <tr>
                                    <th className="p-6 whitespace-nowrap">Serie & Fecha</th>
                                    <th className="p-6">Cliente</th>
                                    <th className="p-6 text-center">Total</th>
                                    <th className="p-6">Estado Actual</th>
                                    <th className="p-6 text-right">Acciones Rápidas</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6">
                                            <span className="font-bold text-[#2b323f] block">{order.serial}</span>
                                            <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="p-6">
                                            <span className="font-bold text-gray-700 block">{order.customer?.name}</span>
                                            <span className="text-xs text-gray-500 block">{order.customer?.phone}</span>
                                            <span className="text-xs text-gray-400 truncate w-40 block">{order.customer?.city}</span>
                                        </td>
                                        <td className="p-6 text-center font-kroma-logo text-lg text-[#2b323f]">
                                            S/ {parseFloat(order.total).toFixed(2)}
                                        </td>
                                        <td className="p-6">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value, order.status)}
                                                className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider outline-none cursor-pointer border-none 
                                                    ${order.status === 'pendiente' ? 'bg-yellow-200/50 text-yellow-800' :
                                                        order.status === 'aprobado' ? 'bg-blue-200/50 text-blue-800' :
                                                            order.status === 'en_camino' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                                order.status === 'entregado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                                    'bg-red-50 text-red-700 border-red-200'}`}
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="aprobado">Aprobado</option>
                                                <option value="en_camino">En Camino</option>
                                                <option value="entregado">Entregado</option>
                                                <option value="cancelado">Cancelado</option>
                                            </select>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2 items-center h-full">
                                                {order.status === 'pendiente' && (
                                                    <button onClick={() => handleStatusChange(order.id, 'aprobado', order.status)} className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition" title="Aprobar"><CheckCircle size={18} /></button>
                                                )}
                                                {order.status === 'aprobado' && (
                                                    <button onClick={() => handleStatusChange(order.id, 'en_camino', order.status)} className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition" title="Enviar"><Truck size={18} /></button>
                                                )}
                                                {order.status === 'en_camino' && (
                                                    <button onClick={() => handleStatusChange(order.id, 'entregado', order.status)} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition" title="Marcar Entregado"><PackageCheck size={18} /></button>
                                                )}
                                                {(order.status === 'pendiente' || order.status === 'aprobado') && (
                                                    <button onClick={() => handleStatusChange(order.id, 'cancelado', order.status)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition" title="Cancelar Pedido"><XCircle size={18} /></button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders