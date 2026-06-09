import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Star, Truck, ShieldCheck, Loader } from 'lucide-react'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'
import Swal from 'sweetalert2'

const ProductDetailPage = () => {
    const { id } = useParams()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    // 1. CARGAR PRODUCTO DESDE FIREBASE
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id)
                setProduct(data)
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity)
            Swal.fire({
                title: '¡Agregado!',
                text: `Añadiste ${quantity}x ${product.name} al carrito.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'bottom-end'
            })
        }
    }

    // Vista de Carga
    if (loading) return (
        <div className="min-h-screen bg-[#fdfdf1] flex items-center justify-center">
            <Loader className="animate-spin text-[#EC5E27]" size={32} />
        </div>
    )

    // Vista de Error (No encontrado)
    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdf1]">
                <h2 className="text-2xl font-kroma-logo text-[#2b323f]">Producto no encontrado</h2>
                <Link to="/catalogo" className="mt-4 text-[#EC5E27] underline">Volver al catálogo</Link>
            </div>
        )
    }

    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link to="/catalogo" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-8 transition-colors">
                    <ArrowLeft size={16} /> Volver a la colección
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* IMAGEN */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            {product.isFeatured && (
                                <span className="absolute top-4 left-4 bg-[#EC5E27] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                                    Bestseller
                                </span>
                            )}
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[#EC5E27] font-bold tracking-widest uppercase mb-2">{product.brand}</h3>
                        <h1 className="text-4xl md:text-5xl font-kroma-logo text-[#2b323f] mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-light text-[#2b323f]">S/ {parseFloat(product.price).toFixed(2)}</span>
                            <div className="flex items-center text-yellow-500 gap-1 text-sm">
                                <Star fill="currentColor" size={16} />
                                <span className="text-gray-400 ml-1">(5.0 · Exclusivo)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                        {/* SELECTOR CANTIDAD */}
                        <div className="mb-8 border-t border-b border-gray-200 py-6">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-[#2b323f] uppercase">Cantidad</span>
                                <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 text-gray-500 hover:text-[#EC5E27]">-</button>
                                    <span className="px-2 font-medium w-8 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="px-2 text-gray-500 hover:text-[#EC5E27]">+</button>
                                </div>
                            </div>
                        </div>

                        {/* BOTONES */}
                        <div className="flex flex-col gap-3 mb-8">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-[#2b323f] text-[#fdfdf1] py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#EC5E27] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                            >
                                <ShoppingBag size={20} />
                                Agregar al Carrito
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-3"><Truck size={20} className="text-[#EC5E27]" /><span>Envío Gratis</span></div>
                            <div className="flex items-center gap-3"><ShieldCheck size={20} className="text-[#EC5E27]" /><span>Originalidad Garantizada</span></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage