import { Link } from 'react-router-dom'
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center bg-[#fdfdf1] text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-6" />
                <h2 className="text-3xl font-kroma-logo text-[#2b323f] mb-4">Tu bolsa está vacía</h2>
                <p className="text-gray-500 mb-8">Parece que aún no has descubierto tu esencia ideal.</p>
                <Link to="/catalogo" className="bg-[#2b323f] text-white px-8 py-3 rounded-full hover:bg-[#EC5E27] transition-colors uppercase tracking-widest text-sm font-bold">
                    Explorar Colección
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-4xl font-kroma-logo text-[#2b323f] mb-8">Tu Bolsa de Compras</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* --- LISTA DE PRODUCTOS (Izquierda) --- */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 md:gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 items-center">

                                {/* Imagen Miniatura */}
                                <Link to={`/producto/${item.id}`} className="w-20 h-24 md:w-24 md:h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </Link>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-[#EC5E27] font-bold uppercase tracking-widest mb-1">{item.brand}</p>
                                            <Link to={`/producto/${item.id}`} className="text-[#2b323f] font-medium font-kroma-logo text-lg hover:text-[#EC5E27] transition-colors">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-gray-200 rounded-full">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-1 text-gray-500 hover:text-[#EC5E27]"
                                            >-</button>
                                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 text-gray-500 hover:text-[#EC5E27]"
                                            >+</button>
                                        </div>
                                        <p className="font-bold text-[#2b323f]">
                                            S/ {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* --- RESUMEN DE PAGO (Derecha) --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-28">
                            <h3 className="text-xl font-kroma-logo text-[#2b323f] mb-6">Resumen del Pedido</h3>

                            <div className="space-y-4 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-8">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>S/ {totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span className="text-green-600 font-medium">Gratis</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-[#2b323f] pt-4">
                                    <span>Total</span>
                                    <span>S/ {totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-[#2b323f] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#EC5E27] transition-all flex justify-center items-center gap-2 shadow-lg"
                            >
                                Proceder al Pago
                                <ArrowRight size={18} />
                            </Link>

                            <div className="mt-6 flex justify-center gap-2">
                                {/* Iconos de tarjetas simulados */}
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartPage