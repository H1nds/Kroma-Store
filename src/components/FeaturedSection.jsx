import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Importante para el botón ver todo
import { getAllProducts } from '../services/productService'
import ProductCard from './ProductCard'
import { Loader } from 'lucide-react'

const FeaturedSection = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // 1. Traemos todos los productos
                const allProducts = await getAllProducts()

                // 2. Filtramos SOLO los que tienen isFeatured activado
                // y tomamos máximo 4 para que se vea bonito
                const featured = allProducts
                    .filter(product => product.isFeatured === true)
                    .slice(0, 4)

                setProducts(featured)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchFeatured()
    }, [])

    if (loading) return <div className="py-20 flex justify-center"><Loader className="animate-spin text-[#EC5E27]" /></div>

    // Si no hay destacados, ocultamos la sección o mostramos mensaje
    if (products.length === 0) return null

    return (
        <section className="py-24 bg-[#fdfdf1]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Encabezado */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-kroma-logo text-[#2b323f] mb-4">
                        Nuestros Favoritos
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Una selección curada de las fragancias más solicitadas.
                    </p>
                </div>

                {/* GRID REAL DE FIREBASE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            {...product} // Pasamos la data real de Firebase
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Botón ver todo */}
                <div className="text-center mt-12">
                    <Link to="/catalogo" className="inline-block border-b border-[#2b323f] pb-1 text-[#2b323f] hover:text-[#EC5E27] hover:border-[#EC5E27] transition-all font-bold uppercase tracking-widest text-sm">
                        Ver Colección Completa
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default FeaturedSection