import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Swal from 'sweetalert2'

const ProductCard = ({ id, name, brand, price, image, category, delay }) => {
    const { addToCart } = useCart()

    const handleQuickAdd = (e) => {
        e.preventDefault() // Evita que al dar clic te lleve a la página de detalle
        const productToAdd = { id, name, brand, price, image, category }
        addToCart(productToAdd, 1)

        // Alerta elegante y sutil
        Swal.fire({
            title: '¡Agregado al carrito!',
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
            iconColor: '#EC5E27'
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay }}
            className="group relative"
        >
            {/* --- IMAGEN DEL PRODUCTO --- */}
            <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4 shadow-sm">
                <Link to={`/producto/${id}`}>
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Botón de "Añadir Rápido" funcional */}
                <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={handleQuickAdd}
                        className="bg-[#2b323f] text-[#fdfdf1] p-3 rounded-full shadow-xl hover:bg-[#EC5E27] hover:scale-110 transition-all"
                        title="Añadir al carrito"
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>
            </div>

            {/* --- INFORMACIÓN --- */}
            <div className="space-y-1">
                <p className="text-xs font-bold text-[#EC5E27] tracking-widest uppercase">{brand}</p>
                <Link to={`/producto/${id}`}>
                    <h3 className="text-lg font-medium text-[#2b323f] group-hover:text-[#EC5E27] transition-colors font-kroma-logo">
                        {name}
                    </h3>
                </Link>
                <p className="text-gray-500 font-sans font-medium">
                    S/ {parseFloat(price).toFixed(2)}
                </p>
            </div>
        </motion.div>
    )
}

export default ProductCard