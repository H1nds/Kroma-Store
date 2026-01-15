import { Link } from 'react-router-dom'
import { ShoppingBag, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

const ProductCard = ({ id, name, brand, price, image, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} // Solo se anima la primera vez que lo ves
            transition={{ duration: 0.6, delay: delay }} // Delay escalonado para efecto cascada
            className="group relative"
        >
            {/* --- IMAGEN DEL PRODUCTO (Estándar 4:5) --- */}
            <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4">
                <Link to={`/producto/${id}`}>
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Botón de "Añadir Rápido" que aparece al hacer Hover */}
                <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-[#2b323f] text-[#fdfdf1] p-3 rounded-full shadow-lg hover:bg-[#EC5E27] transition-colors">
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
                    S/ {price.toFixed(2)}
                </p>
            </div>
        </motion.div>
    )
}

export default ProductCard