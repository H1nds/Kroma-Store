import { useLocation, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const InfoPage = () => {
    const { pathname } = useLocation()

    // Base de datos de textos según la ruta
    const contentMap = {
        '/envios': {
            title: 'Envíos y Entregas',
            text: (
                <div className="space-y-4">
                    <p>En Kroma nos aseguramos de que tu fragancia llegue en perfectas condiciones. Realizamos envíos a todo el Perú.</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-4">
                        <li><strong>Envíos Locales:</strong> Las entregas en Tacna y Moquegua se realizan en menos de 24 horas hábiles una vez confirmado el pedido.</li>
                        <li><strong>Resto del país:</strong> Enviamos mediante Shalom y Olva Courier. El tiempo estimado es de 2 a 4 días hábiles.</li>
                        <li>El costo de envío se calculará y coordinará al momento de confirmar el pago por WhatsApp.</li>
                    </ul>
                </div>
            )
        },
        '/devoluciones': {
            title: 'Política de Devoluciones',
            text: 'Debido a la naturaleza exclusiva de la alta perfumería y por motivos de higiene, solo aceptamos devoluciones si el frasco presenta un defecto de fábrica comprobable y mantiene su celofán original intacto. Tienes un plazo de 7 días calendario tras la recepción para comunicarte con nosotros.'
        },
        '/faq': {
            title: 'Preguntas Frecuentes',
            text: (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-[#2b323f] mb-2">¿Los perfumes son 100% originales?</h3>
                        <p>Absolutamente. Todos nuestros perfumes son importados y adquiridos directamente de distribuidores autorizados o boutiques oficiales.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#2b323f] mb-2">¿Cómo funciona el pedido por WhatsApp?</h3>
                        <p>Al finalizar tu compra en la web, serás redirigido a WhatsApp. Allí confirmaremos el stock de tu producto, coordinaremos el método de pago (Yape/Transferencia) y programaremos el envío.</p>
                    </div>
                </div>
            )
        },
        '/terminos': {
            title: 'Términos y Condiciones',
            text: 'Al acceder y utilizar los servicios de Kroma Store, aceptas nuestras políticas de uso. Nos reservamos el derecho de modificar precios y disponibilidad de productos sin previo aviso. Todo pedido está sujeto a confirmación de stock.'
        }
    }

    // Si la ruta no está en el mapa, mostramos un título por defecto
    const currentPage = contentMap[pathname] || { title: 'Información', text: 'Página en construcción.' }

    return (
        <div className="min-h-screen bg-[#fdfdf1] pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">

                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EC5E27] mb-8 transition-colors">
                    <ArrowLeft size={16} /> Volver al inicio
                </Link>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-kroma-logo text-[#2b323f] mb-8 pb-6 border-b border-gray-100">
                        {currentPage.title}
                    </h1>

                    <div className="text-gray-600 leading-relaxed font-sans text-lg">
                        {currentPage.text}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InfoPage