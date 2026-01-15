import { motion } from 'framer-motion'

// Lista de marcas que manejas (puedes añadir más)
const BRANDS = [
    "VERSACE", "DIOR", "CHANEL", "YVES SAINT LAURENT", "CAROLINA HERRERA",
    "PACO RABANNE", "GIORGIO ARMANI", "JEAN PAUL GAULTIER"
]

const Brands = () => {
    return (
        <section className="py-12 bg-[#fdfdf1] border-b border-[#2b323f]/5 overflow-hidden">

            <div className="flex w-full">
                {/* Contenedor animado que se mueve a la izquierda infinitamente */}
                <motion.div
                    className="flex gap-16 items-center whitespace-nowrap"
                    // La animación mueve el contenido del 0% al -50% (para crear el bucle)
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 20, // Velocidad: más alto = más lento
                        repeat: Infinity
                    }}
                >
                    {/* Renderizamos la lista DOS veces para crear la ilusión de infinito sin cortes */}
                    {[...BRANDS, ...BRANDS].map((brand, index) => (
                        <div key={index} className="flex items-center gap-16">
                            <span className="text-2xl md:text-4xl font-kroma-logo text-[#2b323f]/80 uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity cursor-default">
                                {brand}
                            </span>
                            {/* Pequeño separador decorativo (estrella) entre marcas */}
                            <span className="text-[#EC5E27] text-xl">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Brands