import ProductCard from './ProductCard'

// Importa tus imágenes aquí (ajusta los nombres si es necesario)
// Si no tienes las imágenes aún, comenta estas líneas y el array usará placeholders
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import p4 from '../assets/p4.jpg'

const PRODUCTS = [
    {
        id: 1,
        brand: "Versace",
        name: "Dylan Blue Pour Homme",
        price: 185.00,
        image: p1
    },
    {
        id: 2,
        brand: "Yves Saint Laurent",
        name: "Libre Eau de Parfum",
        price: 210.50,
        image: p2
    },
    {
        id: 3,
        brand: "Giorgio Armani",
        name: "Acqua di Gio Profondo",
        price: 195.00,
        image: p3
    },
    {
        id: 4,
        brand: "Carolina Herrera",
        name: "Good Girl Supreme",
        price: 230.00,
        image: p4
    }
]

const FeaturedSection = () => {
    return (
        <section className="py-24 bg-[#fdfdf1]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Encabezado de la sección */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-kroma-logo text-[#2b323f] mb-4">
                        Nuestros Favoritos
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Una selección curada de las fragancias más solicitadas por nuestros clientes exclusivos.
                    </p>
                </div>

                {/* GRID DE PRODUCTOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            {...product} // Pasamos todas las propiedades del objeto al componente
                            delay={index * 0.1} // Delay calculado para que aparezcan uno tras otro
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default FeaturedSection