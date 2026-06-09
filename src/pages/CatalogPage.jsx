import { useState, useMemo, useEffect } from 'react'
import { Filter, Search, Loader } from 'lucide-react'
import { getAllProducts } from '../services/productService' // <--- Usamos el servicio real
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

const CatalogPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [products, setProducts] = useState([]) // Estado para los productos REALES
    const [loading, setLoading] = useState(true) // Estado de carga

    // Filtros
    const [filters, setFilters] = useState({
        category: [],
        brand: [],
        maxPrice: 2000, // Aumenté el rango por si hay perfumes caros
        search: ''
    })

    // 1. CARGAR DATOS DE FIREBASE AL ENTRAR
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts()
                setProducts(data)
            } catch (error) {
                console.error("Error cargando catálogo:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    // Obtener marcas únicas de los productos cargados
    const uniqueBrands = [...new Set(products.map(p => p.brand))]

    // 2. LÓGICA DE FILTRADO (Idéntica a la anterior, pero con datos reales)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.brand.toLowerCase().includes(filters.search.toLowerCase())
            const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category)
            const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand)
            const matchesPrice = product.price <= filters.maxPrice

            return matchesSearch && matchesCategory && matchesBrand && matchesPrice
        })
    }, [filters, products])

    const handleFilterChange = (type, value) => {
        if (type === 'maxPrice' || type === 'search') {
            setFilters(prev => ({ ...prev, [type]: value }))
        } else {
            setFilters(prev => {
                const list = prev[type]
                const newList = list.includes(value)
                    ? list.filter(item => item !== value)
                    : [...list, value]
                return { ...prev, [type]: newList }
            })
        }
    }

    // --- VISTA DE CARGA ---
    if (loading) {
        return (
            <div className="min-h-screen bg-[#fdfdf1] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="animate-spin text-[#EC5E27]" size={48} />
                    <p className="font-kroma-logo text-[#2b323f] animate-pulse">Cargando colección...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ENCABEZADO */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-kroma-logo text-[#2b323f] mb-2">Colección</h1>
                        <p className="text-gray-500">{filteredProducts.length} resultados encontrados</p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar perfume..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:border-[#EC5E27] transition-colors"
                            />
                        </div>
                        <button
                            className="lg:hidden p-2 border border-gray-300 rounded-full hover:bg-white transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Filter size={24} className="text-[#2b323f]" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-8">
                    <FilterSidebar
                        isOpen={isSidebarOpen}
                        closeSidebar={() => setIsSidebarOpen(false)}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        brands={uniqueBrands}
                    />

                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} {...product} delay={index * 0.05} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-xl text-gray-400 font-kroma-logo mb-2">No encontramos resultados.</p>
                                <button
                                    onClick={() => setFilters({ category: [], brand: [], maxPrice: 2000, search: '' })}
                                    className="text-[#EC5E27] font-bold hover:underline"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogPage