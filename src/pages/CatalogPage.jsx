import { useState, useMemo } from 'react'
import { Filter, Search } from 'lucide-react'
import { products } from '../data/products' // Nuestra "Base de Datos"
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

const CatalogPage = () => {
    // Estado para controlar si el sidebar móvil está abierto
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Estado de los filtros
    const [filters, setFilters] = useState({
        category: [],
        brand: [],
        maxPrice: 1000,
        search: ''
    })

    // Obtener lista única de marcas desde los productos para el sidebar
    const uniqueBrands = [...new Set(products.map(p => p.brand))]

    // --- FUNCIÓN DE FILTRADO ---
    // Usamos useMemo para que no recalcule en cada render innecesario
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Filtro por Buscador (Texto)
            const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.brand.toLowerCase().includes(filters.search.toLowerCase())

            // 2. Filtro por Categoría (Si el array está vacío, muestra todo)
            const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category)

            // 3. Filtro por Marca
            const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand)

            // 4. Filtro por Precio
            const matchesPrice = product.price <= filters.maxPrice

            return matchesSearch && matchesCategory && matchesBrand && matchesPrice
        })
    }, [filters]) // Se ejecuta cada vez que 'filters' cambia

    // Manejador de cambios en los filtros
    const handleFilterChange = (type, value) => {
        if (type === 'maxPrice' || type === 'search') {
            setFilters(prev => ({ ...prev, [type]: value }))
        } else {
            // Para arrays (checkboxes): si ya existe lo quita, si no existe lo agrega
            setFilters(prev => {
                const list = prev[type]
                const newList = list.includes(value)
                    ? list.filter(item => item !== value) // Quitar
                    : [...list, value] // Agregar
                return { ...prev, [type]: newList }
            })
        }
    }

    return (
        <div className="bg-[#fdfdf1] min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- ENCABEZADO Y BUSCADOR --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-kroma-logo text-[#2b323f] mb-2">Colección</h1>
                        <p className="text-gray-500">{filteredProducts.length} resultados encontrados</p>
                    </div>

                    {/* Barra de búsqueda y Botón Filtros (Móvil) */}
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
                    {/* --- SIDEBAR (IZQUIERDA) --- */}
                    <FilterSidebar
                        isOpen={isSidebarOpen}
                        closeSidebar={() => setIsSidebarOpen(false)}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        brands={uniqueBrands}
                    />

                    {/* --- GRILLA DE PRODUCTOS (DERECHA) --- */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} {...product} delay={index * 0.05} />
                                ))}
                            </div>
                        ) : (
                            // Mensaje si no hay resultados
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-xl text-gray-400 font-kroma-logo mb-2">No encontramos ese perfume.</p>
                                <button
                                    onClick={() => setFilters({ category: [], brand: [], maxPrice: 1000, search: '' })}
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