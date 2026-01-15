import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Importamos las páginas
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogo" element={<CatalogPage />} />

                {/* Esta es la ruta dinámica ":id" es la variable */}
                <Route path="/producto/:id" element={<ProductDetailPage />} />

                <Route path="/carrito" element={<CartPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<div className="pt-32 text-center">Página no encontrada</div>} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App