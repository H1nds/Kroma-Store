import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../../services/productService'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { motion } from 'framer-motion'

const AdminDashboard = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // Cargar productos al entrar
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const data = await getAllProducts()
        setProducts(data)
        setLoading(false)
    }

    const handleDelete = async (id, imageUrl) => {
        if (window.confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.")) {
            await deleteProduct(id, imageUrl)
            fetchProducts() // Recargar lista
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-kroma-logo text-[#2b323f]">Panel de Administración</h1>
                        <p className="text-gray-500">Gestiona el inventario de Kroma.</p>
                    </div>
                    <Link
                        to="/admin/nuevo"
                        className="bg-[#2b323f] text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-wider hover:bg-[#EC5E27] transition-colors shadow-lg"
                    >
                        <Plus size={20} /> Nuevo Producto
                    </Link>
                </div>

                {/* Tabla de Productos */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Cargando inventario...</div>
                    ) : products.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center">
                            <Package size={48} className="text-gray-300 mb-4" />
                            <p className="text-gray-500">Aún no hay productos.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="p-6">Producto</th>
                                    <th className="p-6">Categoría</th>
                                    <th className="p-6">Precio</th>
                                    <th className="p-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-6 flex items-center gap-4">
                                            <img src={product.image} alt={product.name} className="w-12 h-16 object-cover rounded-md bg-gray-200" />
                                            <div>
                                                <div className="font-bold text-[#2b323f]">{product.name}</div>
                                                <div className="text-xs text-[#EC5E27] uppercase">{product.brand}</div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-gray-600">{product.category}</td>
                                        <td className="p-6 font-medium">S/ {parseFloat(product.price).toFixed(2)}</td>
                                        <td className="p-6 text-right space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-[#2b323f] transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id, product.image)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard