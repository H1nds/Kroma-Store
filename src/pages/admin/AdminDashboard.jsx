import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../../services/productService'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

const AdminDashboard = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const data = await getAllProducts()
        setProducts(data)
        setLoading(false)
    }

    const handleDelete = async (id, imageUrl) => {
        const result = await Swal.fire({
            title: '¿Eliminar producto?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EC5E27',
            cancelButtonColor: '#2b323f',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            await deleteProduct(id, imageUrl)
            fetchProducts()
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El producto ha sido borrado.',
                icon: 'success',
                confirmButtonColor: '#2b323f'
            })
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfdf1] pt-28 pb-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* --- Encabezado Adaptable a Móvil --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-kroma-logo text-[#2b323f]">Panel de Administración</h1>
                        <p className="text-gray-500 text-sm md:text-base">Gestiona el inventario de Kroma.</p>
                    </div>

                    {/* Botones apilables en móvil, en línea en PC */}
                    <div className="flex flex-row w-full md:w-auto gap-3">
                        <Link
                            to="/admin/nuevo"
                            className="flex-1 md:flex-none justify-center bg-[#2b323f] text-white px-4 md:px-6 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-wider hover:bg-[#EC5E27] transition-colors shadow-lg text-xs md:text-sm whitespace-nowrap"
                        >
                            <Plus size={18} /> Nuevo
                        </Link>
                        <Link
                            to="/admin/pedidos"
                            className="flex-1 md:flex-none justify-center border-2 border-[#2b323f] text-[#2b323f] px-4 md:px-6 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors text-xs md:text-sm whitespace-nowrap"
                        >
                            Pedidos
                        </Link>
                    </div>
                </div>

                {/* --- Contenedor Principal de la Tabla --- */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">

                    {/* ESTE DIV CREA EL SCROLL HORIZONTAL EN CELULARES */}
                    <div className="overflow-x-auto custom-scrollbar">

                        {loading ? (
                            <div className="p-12 text-center text-gray-500 min-w-[600px]">Cargando inventario...</div>
                        ) : products.length === 0 ? (
                            <div className="p-12 text-center flex flex-col items-center min-w-[600px]">
                                <Package size={48} className="text-gray-300 mb-4" />
                                <p className="text-gray-500">Aún no hay productos.</p>
                            </div>
                        ) : (
                            // 'min-w-[700px]' evita que la tabla se aplaste en pantallas pequeñas
                            <table className="w-full text-left min-w-[700px]">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                    <tr>
                                        <th className="p-4 md:p-6 whitespace-nowrap">Producto</th>
                                        <th className="p-4 md:p-6 whitespace-nowrap">Categoría</th>
                                        <th className="p-4 md:p-6 whitespace-nowrap">Precio</th>
                                        <th className="p-4 md:p-6 text-right whitespace-nowrap">Acciones</th>
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
                                            <td className="p-4 md:p-6 flex items-center gap-4">
                                                <img src={product.image} alt={product.name} className="w-12 h-16 object-cover rounded-md bg-gray-200 shadow-sm" />
                                                <div className="min-w-[150px]">
                                                    <div className="font-bold text-[#2b323f] truncate">{product.name}</div>
                                                    <div className="text-xs text-[#EC5E27] uppercase">{product.brand}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 md:p-6 text-gray-600">{product.category}</td>
                                            <td className="p-4 md:p-6 font-medium whitespace-nowrap">S/ {parseFloat(product.price).toFixed(2)}</td>
                                            <td className="p-4 md:p-6 text-right">
                                                <div className="flex items-center gap-2 justify-end h-full">
                                                    <Link
                                                        to={`/admin/editar/${product.id}`}
                                                        className="p-2 bg-gray-50 text-gray-400 hover:text-[#EC5E27] hover:bg-[#EC5E27]/10 rounded-lg transition-colors flex items-center"
                                                        title="Editar producto"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id, product.image)}
                                                        className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                                                        title="Eliminar producto"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard