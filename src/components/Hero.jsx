import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' // Importamos la magia de las animaciones
import { ArrowRight } from 'lucide-react'
import { getHeroImage } from '../services/productService' // Importamos el servicio
import defaultHeroImage from '../assets/hero-perfume.jpg' // Renombramos a default

const Hero = () => {
    // 1. Estado para almacenar la imagen (inicia con la que tienes localmente)
    const [heroImg, setHeroImg] = useState(defaultHeroImage)

    // 2. Al cargar, verificamos si hay una portada en Firebase
    useEffect(() => {
        getHeroImage().then(url => {
            if (url) setHeroImg(url)
        })
    }, [])

    return (
        <section className="relative w-full min-h-screen flex items-center bg-[#fdfdf1] overflow-hidden pt-20">

            {/* Círculo decorativo de fondo (Efecto moderno sutil) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EC5E27]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* --- COLUMNA IZQUIERDA: TEXTOS --- */}
                <div className="z-10">

                    {/* Animación del subtítulo */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[#EC5E27] font-semibold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Personal Shopper de Alta Perfumería
                    </motion.span>

                    {/* Animación del Título Principal */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold text-[#2b323f] font-kroma-logo leading-tight mb-6"
                    >
                        La esencia de <br />
                        <span className="italic font-light">la sofisticación</span>
                    </motion.h1>

                    {/* Animación del Párrafo */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed font-sans"
                    >
                        No vendemos perfumes, cumplimos deseos. Dinos qué fragancia buscas y nosotros nos encargamos de llevarla a tus manos.
                    </motion.p>

                    {/* Animación de los Botones */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/catalogo" className="group flex items-center justify-center gap-2 bg-[#2b323f] text-[#fdfdf1] px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-[#EC5E27] transition-all duration-300">
                            Ver Catálogo
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link to="/nosotros" className="flex items-center justify-center px-8 py-4 rounded-full text-sm uppercase tracking-wider text-[#2b323f] border border-[#2b323f]/30 hover:border-[#2b323f] transition-all duration-300">
                            Cómo funciona
                        </Link>
                    </motion.div>
                </div>

                {/* --- COLUMNA DERECHA: IMAGEN --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative z-10 w-full"
                >

                    <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-[#f0f0e8]">
                        {/* 3. Renderizamos la imagen dinámica en lugar de la estática */}
                        <img
                            src={heroImg}
                            alt="Perfume exclusivo"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2b323f]/10 via-transparent to-transparent" />
                    </div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="absolute -bottom-6 -left-6 bg-[#fdfdf1]/90 backdrop-blur-sm p-6 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] max-w-[200px] hidden md:block border border-[#2b323f]/5"
                    >
                        <p className="font-kroma-logo text-3xl text-[#EC5E27] mb-1">100%</p>
                        <p className="text-xs text-[#2b323f]/70 uppercase tracking-wider font-medium">Originales & <br /> Entrega Segura</p>
                    </motion.div>

                </motion.div>

            </div>
        </section>
    )
}

export default Hero