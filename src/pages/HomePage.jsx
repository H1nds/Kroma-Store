import Hero from '../components/Hero'
import Brands from '../components/Brands'
import FeaturedSection from '../components/FeaturedSection'

const HomePage = () => {
    return (
        <div className="bg-[#fdfdf1] min-h-screen">
            <main>
                <Hero />
                {/* SECCIÓN DE MARCAS */}
                <Brands />
                {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
                <FeaturedSection />
            </main>
        </div>
    )
}

export default HomePage