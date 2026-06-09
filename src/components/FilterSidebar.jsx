import { X } from 'lucide-react'

const FilterSidebar = ({ isOpen, closeSidebar, filters, handleFilterChange, brands }) => {
    return (
        <>
            {/* Overlay oscuro para móviles cuando se abre el filtro */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeSidebar}
            />

            {/* Sidebar */}
            <aside className={`
        fixed lg:static top-0 left-0 z-50 h-full w-[280px] bg-[#fdfdf1] border-r border-[#2b323f]/10 p-6 
        transform transition-transform duration-300 ease-in-out lg:transform-none lg:w-64 lg:block overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

                {/* Cabecera Móvil */}
                <div className="flex justify-between items-center lg:hidden mb-6">
                    <h2 className="text-xl font-kroma-logo font-bold">Filtros</h2>
                    <button onClick={closeSidebar}><X size={24} /></button>
                </div>

                {/* --- FILTRO: GÉNERO / CATEGORÍA --- */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b323f] mb-4">Género</h3>
                    <div className="space-y-3">
                        {['Hombre', 'Mujer', 'Unisex'].map((cat) => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.category.includes(cat)}
                                    onChange={() => handleFilterChange('category', cat)}
                                    className="w-4 h-4 border-2 border-gray-300 rounded checked:bg-[#EC5E27] checked:border-[#EC5E27] transition-colors"
                                />
                                <span className="text-gray-600 group-hover:text-[#EC5E27] transition-colors">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* --- FILTRO: MARCAS --- */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b323f] mb-4">Marcas</h3>
                    <div className="space-y-3">
                        {brands.map((brand) => (
                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.brand.includes(brand)}
                                    onChange={() => handleFilterChange('brand', brand)}
                                    className="w-4 h-4 border-2 border-gray-300 rounded checked:bg-[#EC5E27] checked:border-[#EC5E27] transition-colors"
                                />
                                <span className="text-gray-600 group-hover:text-[#EC5E27] transition-colors">{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* --- FILTRO: PRECIO (Simple) --- */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b323f] mb-4">Precio Máximo</h3>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#EC5E27]"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>S/ 0</span>
                        <span className="font-bold text-[#EC5E27]">S/ {filters.maxPrice}</span>
                    </div>
                </div>

            </aside>
        </>
    )
}

export default FilterSidebar