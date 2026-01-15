import Navbar from '../components/Navbar' // Aseguramos que el navbar esté
import Hero from '../components/Hero'
import Brands from '../components/Brands'
import FeaturedSection from '../components/FeaturedSection'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <div className="bg-[#fdfdf1] min-h-screen">
            {/* El Navbar ya está en App.jsx, así que aquí solo ponemos el contenido */}

            <main>
                <Hero />
                {/* SECCIÓN DE MARCAS */}
                <Brands />
                {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
                <FeaturedSection />
                {/* Footer visible siempre abajo */}
                <Footer />
            </main>
        </div>
    )
}

export default HomePage