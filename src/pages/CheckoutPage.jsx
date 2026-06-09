import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, MapPin, User, Phone } from 'lucide-react'
import { useAuth } from '../context/AuthContext' 
import { createOrder } from '../services/orderService' 

const CheckoutPage = () => {
    const navigate = useNavigate()
    const { cart, totalPrice, clearCart } = useCart()
    const { user } = useAuth()

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'yape' // por defecto
    })

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // --- LÓGICA MAESTRA: GENERAR PEDIDO Y WHATSAPP ---
    const handlePlaceOrder = async (e) => { // <--- Agregamos 'async'
        e.preventDefault()

        // 1. Generar un número de serie único tipo "KRM-X8F9A"
        const serialNumber = 'KRM-' + Math.random().toString(36).substr(2, 5).toUpperCase()

        // 2. Guardar en Firebase SOLO si el usuario está logueado
        if (user) {
            const newOrder = {
                serial: serialNumber,
                userEmail: user.email,
                items: cart,
                total: totalPrice,
                status: 'pendiente', // Estado inicial
                customer: formData,
                createdAt: new Date().toISOString()
            }
            try {
                await createOrder(newOrder)
            } catch (error) {
                console.error("Error guardando el pedido:", error)
            }
        }

        // 3. Crear el mensaje de WhatsApp incluyendo el número de serie
        const phoneNumber = "953704345"
        let message = `*¡Hola Kroma! Quiero realizar el pedido #${serialNumber}:*\n\n`

        cart.forEach(item => {
            message += `🛍️ ${item.quantity}x ${item.name} - S/ ${(item.price * item.quantity).toFixed(2)}\n`
        })

        message += `\n*TOTAL A PAGAR: S/ ${totalPrice.toFixed(2)}*\n`
        message += `----------------------------------\n`
        message += `👤 *Cliente:* ${formData.name}\n`
        message += `📞 *Teléfono:* ${formData.phone}\n`
        message += `📍 *Dirección:* ${formData.address}, ${formData.city}\n`
        message += `💳 *Método de Pago:* ${formData.paymentMethod.toUpperCase()}\n`
        message += `----------------------------------\n`
        message += `Quedo a la espera de su confirmación.`

        const whatsappUrl = `https://wa.me/51${phoneNumber}?text=${encodeURIComponent(message)}`

        // 1. Abrir WhatsApp en una NUEVA pestaña
        window.open(whatsappUrl, '_blank')

        // 2. Vaciar el carrito de compras
        clearCart()

        // 3. Redirigir la pestaña actual a la página de éxito
        navigate('/orden-completada')
    }

    if (cart.length === 0) {
        return <div className="pt-32 text-center">Tu carrito está vacío. <Link to="/catalogo" className="underline">Volver</Link></div>
    }

    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link to="/carrito" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-8 transition-colors">
                    <ArrowLeft size={16} /> Volver al carrito
                </Link>

                <h1 className="text-3xl md:text-4xl font-kroma-logo text-[#2b323f] mb-8">Finalizar Compra</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* --- COLUMNA IZQUIERDA: FORMULARIO DE ENVÍO --- */}
                    <div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold font-kroma-logo text-[#2b323f] mb-6 flex items-center gap-2">
                                <MapPin size={20} className="text-[#EC5E27]" />
                                Datos de Envío
                            </h2>

                            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">

                                {/* Nombre */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Juan Pérez"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Celular</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Ej: 999 999 999"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Dirección y Ciudad */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Ciudad</label>
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Lima / Miraflores"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Dirección</label>
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Av. Larco 123 Dpt 401"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EC5E27] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Método de Pago */}
                                <div className="pt-4">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Método de Pago Preferido</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.paymentMethod === 'yape' ? 'border-[#EC5E27] bg-[#EC5E27]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input type="radio" name="paymentMethod" value="yape" className="hidden" onChange={handleInputChange} checked={formData.paymentMethod === 'yape'} />
                                            <div className="font-bold text-[#2b323f]">Yape / Plin</div>
                                            <div className="text-xs text-gray-500">Pago inmediato</div>
                                        </label>

                                        <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.paymentMethod === 'transferencia' ? 'border-[#EC5E27] bg-[#EC5E27]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input type="radio" name="paymentMethod" value="transferencia" className="hidden" onChange={handleInputChange} checked={formData.paymentMethod === 'transferencia'} />
                                            <div className="font-bold text-[#2b323f]">Transferencia</div>
                                            <div className="text-xs text-gray-500">BCP / Interbank</div>
                                        </label>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: RESUMEN --- */}
                    <div>
                        <div className="bg-[#2b323f] text-[#fdfdf1] p-8 rounded-2xl shadow-xl sticky top-28">
                            <h3 className="text-xl font-kroma-logo mb-6 border-b border-white/10 pb-4">Resumen del Pedido</h3>

                            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-white/10 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                                                {item.quantity}
                                            </span>
                                            <span className="text-gray-300">{item.name}</span>
                                        </div>
                                        <span className="font-medium">S/ {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-2 mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>S/ {totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Envío</span>
                                    <span className="text-[#EC5E27]">Por coordinar</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold font-kroma-logo mt-4">
                                    <span>Total</span>
                                    <span>S/ {totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form" // Esto conecta el botón con el formulario de la izquierda
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-900/20 hover:-translate-y-1"
                            >
                                <MessageCircle size={24} />
                                Pedir por WhatsApp
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                Al hacer clic, se abrirá WhatsApp con los detalles de tu pedido para coordinar el pago y la entrega.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CheckoutPage