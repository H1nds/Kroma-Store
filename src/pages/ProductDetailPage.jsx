import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Star, Truck, ShieldCheck } from 'lucide-react'
import { products } from '../data/products' // Importamos nuestra "base de datos"
import { useCart } from '../context/CartContext'

const ProductDetailPage = () => {
    // 1. Obtenemos el ID de la URL (ej: /producto/2 -> id = "2")
    const { id } = useParams()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    const product = products.find(p => p.id === parseInt(id))

    if (!product) return <div>No encontrado</div>

    const handleAddToCart = () => {
        addToCart(product, quantity)
        alert(`¡Listo! Agregaste ${quantity}x ${product.name} al carrito.`) // Feedback temporal
    }

    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb (Navegación migas de pan) */}
                <Link to="/catalogo" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-8 transition-colors">
                    <ArrowLeft size={16} /> Volver a la colección
                </Link>

                {/* GRID PRINCIPAL: IMAGEN vs INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Etiqueta flotante si es destacado */}
                            {product.isFeatured && (
                                <span className="absolute top-4 left-4 bg-[#EC5E27] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                                    Bestseller
                                </span>
                            )}
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: INFO --- */}
                    <div className="flex flex-col justify-center">

                        {/* Marca y Título */}
                        <h3 className="text-[#EC5E27] font-bold tracking-widest uppercase mb-2">
                            {product.brand}
                        </h3>
                        <h1 className="text-4xl md:text-5xl font-kroma-logo text-[#2b323f] mb-4">
                            {product.name}
                        </h1>

                        {/* Precio y Valoración */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-light text-[#2b323f]">
                                S/ {product.price.toFixed(2)}
                            </span>
                            <div className="flex items-center text-yellow-500 gap-1 text-sm">
                                <Star fill="currentColor" size={16} />
                                <span className="text-gray-400 ml-1">(4.9/5 · 12 reseñas)</span>
                            </div>
                        </div>

                        {/* Descripción (Texto simulado por ahora) */}
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Una fragancia exclusiva que captura la esencia de la sofisticación moderna.
                            Notas cuidadosamente seleccionadas para dejar una impresión duradera.
                            Perfecto para quienes buscan distinguirse con elegancia sutil pero poderosa.
                        </p>

                        {/* Selector de Cantidad FUNCIONAL */}
                        <div className="mb-8 border-t border-b border-gray-200 py-6">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-[#2b323f] uppercase">Cantidad</span>
                                <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="px-2 text-gray-500 hover:text-[#EC5E27]"
                                    >-</button>

                                    <span className="px-2 font-medium w-8 text-center">{quantity}</span>

                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="px-2 text-gray-500 hover:text-[#EC5E27]"
                                    >+</button>
                                </div>
                            </div>
                        </div>

                        {/* Botón Agregar FUNCIONAL */}
                        <div className="flex flex-col gap-3 mb-8">
                            <button
                                onClick={handleAddToCart} // <--- CONECTADO
                                className="w-full bg-[#2b323f] text-[#fdfdf1] py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#EC5E27] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                <ShoppingBag size={20} />
                                Agregar al Carrito
                            </button>
                        </div>

                        {/* Beneficios Extra */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-3">
                                <Truck size={20} className="text-[#EC5E27]" />
                                <span>Envío Gratis a todo Perú</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={20} className="text-[#EC5E27]" />
                                <span>Garantía de Originalidad</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage